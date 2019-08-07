import InputManager from './input-manager';
import InitialScreen from './screens/initial-screen';
import GameScreen from './screens/game-screen';

const SCREENS = {
	'initial': InitialScreen,
	'game': GameScreen,
}

export default class ScreenManager {
	constructor() {
		this.currentScreen = null;
		this.newScreen = null;
		this.isTransitioning = false;
        this.container = null;
        this.width = 550;
        this.height = 400;
        this.container = null;
	}

	static get instance() {
		if (!ScreenManager._instance) {
			ScreenManager._instance = new ScreenManager();
		}

		return ScreenManager._instance;
	}

	goTo(screen) {
		if (!this.isTransitioning) {
			this.newScreen = new SCREENS[screen](this.height, this.width, ScreenManager.instance, InputManager.instance);
			this.isTransitioning = true;
		}
	}

	transition(gameTime) {
		if (this.isTransitioning) {
			this.currentScreen.unload(this.container);
			this.currentScreen = this.newScreen;
			this.currentScreen.load(this.container);
			this.isTransitioning = false;
		}
	}

	load(container) {
        this.container = container;
        this.currentScreen = new InitialScreen(this.height, this.width, ScreenManager.instance, InputManager.instance);
        this.currentScreen.load(container);
	}

	unload(container) { 
        this.currentScreen.unload(container);
    }

	update(gameTime) {
		this.currentScreen.update(gameTime);
		this.transition(gameTime);
	}
}