import MenuManager from '../menu/menu-manager';

export default class InitialScreen {
    constructor(height, width, screenManager, inputManager) {
        this.height = height;
        this.width = width;
        this.screenManager = screenManager;
        this.inputManager = inputManager;

        this.menuManager = new MenuManager('start');
    }

    load(container) {
        menuManager.load(container);
    }

    unload(container) {
        menuManager.unload(container);
    }

    update(gameTime) {
        menuManager.update(gameTime);
    }
}