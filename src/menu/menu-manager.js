import Menu from './menu';
import { MENUS } from './menu.config';

export default class MenuManager {
    constructor(menuId, height, width, screenManager) {
        this.height = height;
        this.width = width;
        this.menuId = menuId;
        this.menu = null;
        this.screenManager = screenManager;
        this.container = null;
    }

    goTo(menuId) {
        this.menu.unload(this.container);
        this.menuId = menuId;
        this.menu = new Menu(MENUS[this.menuId], this.height, this.width, this._onMenuItemSelected.bind(this));
        this.menu.load(this.container);
    }

    load(container) {
        this.menu = new Menu(MENUS[this.menuId], this.height, this.width, this._onMenuItemSelected.bind(this));
        this.menu.load(container);
        this.container = container;
    }

    unload(container) {
        this.menu.unload(container);
    }

    update(gameTime) {
        this.menu.update(gameTime);
    }

    _onMenuItemSelected(type, link) {
        if (type === 'screen') {
            this.screenManager.goTo(link);
        }
    }
}