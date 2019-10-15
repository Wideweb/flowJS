export enum MenuLinkType {
	Screen = 1,
    Menu,
    Button,
}

export class MenuItemConfig {
	constructor(
		public text: string,
		public type: MenuLinkType,
		public link?: string,
		public data?: any,
	) { }
}

export class MenuConfig {
	public items: Array<MenuItemConfig> = [];

	constructor(public id: string) { }

	public addItem(item: MenuItemConfig): MenuConfig {
		this.items.push(item);
		return this;
	}
}

const startMenu = new MenuConfig('start')
    .addItem(new MenuItemConfig('Start Game', MenuLinkType.Screen, 'game'));
    
const gameMenu = new MenuConfig('game-bar')
	.addItem(new MenuItemConfig('line', MenuLinkType.Button))
	.addItem(new MenuItemConfig('circle', MenuLinkType.Button))
	.addItem(new MenuItemConfig('n-line', MenuLinkType.Button))

export const MENUS = new Map<string, MenuConfig>()
	.set(startMenu.id, startMenu)
	.set(gameMenu.id, gameMenu);
