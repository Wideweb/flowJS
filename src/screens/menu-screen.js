import MenuManager from '../menu/menu-manager';

export default class MenuScreen {
    constructor(height, width, screenManager, inputManager) {
        this.height = height;
        this.width = width;
        this.screenManager = screenManager;
        this.inputManager = inputManager;

        this.menuManager = null;
    }

    load(container) {
		this.menuManager = new MenuManager('start', this.height, this.width, this.screenManager);
        this.menuManager.load(container);
    }

    unload(container) {
        this.menuManager.unload(container);
    }

    update(gameTime) {
        this.menuManager.update(gameTime);
    }
}