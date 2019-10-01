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
    public items: Array<MenuItemConfig>

    public addItem(item: MenuItemConfig): MenuConfig {
        this.items.push(item);
        return this;
    }
}

const START_MENU = new MenuConfig()
    .addItem(new MenuItemConfig('Start Game', MenuLinkType.Screen, 'dev'))

export const MENUS = {
    'start': START_MENU,
};