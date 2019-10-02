export enum MenuLinkType {
	Screen = 1,
	Menu,
}

export class MenuItemConfig {
	constructor(
		public text: string,
		public type: MenuLinkType,
		public link: string,
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
	.addItem(new MenuItemConfig('Start Game', MenuLinkType.Screen, 'game'))

export const MENUS = new Map<string, MenuConfig>()
	.set(startMenu.id, startMenu);
