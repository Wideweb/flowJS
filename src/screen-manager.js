import ScreenFactory from './screen-factory';

class ScreenManager {

    constructor() {
        this.currentScreen = new InitialScreen();
        this.newScreen = null;
        this.isTransitioning = false;
        this.container = null;
    }

    static get instance() {
        if (!ScreenManager._instance) {
            ScreenManager._instance = new ScreenManager();
        }

        return ScreenManager._instance;
    }

    changeScreen(screen) {
        if (!this.isTransitioning) {
            this.newScreen = ScreenFactory.create(screen);
            this.isTransitioning = true;
        }
    }

    transition(gameTime) {
        if (this.isTransitioning) {
            this.currentScreen.unload(this.content);
            this.currentScreen = this.newScreen;
            this.currentScreen.load(this.content);
            this.isTransitioning = false;
        }
    }

    load(content) {
        this.content = content;
    }

    unload() { }

    update(gameTime) {
        this.currentScreen.update(gameTime);
        this.transition(gameTime);
    }
}