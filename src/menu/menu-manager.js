import Menu from './menu';
import { MENUS } from './menu.config';

export default class MenuManager {
    constructor(menuId, height, width) {
		this.height = height;
		this.width = width;
		this.menuId = menuId;
        this.menu = null;
        this.container = null;
    }

    goTo(menuId) {
		this.menu.unload(this.container);
		this.menuId = menuId;
        this.menu = new Menu(MENUS[this.menuId], this.height, this.width);
        this.menu.load(this.container);
    }

    load(container) {
		this.menu = new Menu(MENUS[this.menuId], this.height, this.width);
		this.menu.load(container);
        this.container = container;
    }

    unload(container) {

    }

    update(gameTime) {
        this.menu.update(gameTime);
    }
}