import Menu from './menu';
import MENUS from './menu.config';

export default class MenuManager {
    constructor(menuId) {
        this.menu = new Menu(MENUS[menuId]);
        this.container = null;
    }

    goTo(menuId) {
        this.menu.unload(this.container);
        this.menu = new Menu(MENUS[menuId]);
        this.menu.load(this.container);
    }

    load(container) {
        this.container = container;
    }

    unload(container) {

    }

    update(gameTime) {
        this.menu.update(gameTime);
    }
}