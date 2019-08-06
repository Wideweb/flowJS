import InputManager from './input-manager';
import InitialScreen from './screens/initial-screen';
import GameScreen from './screens/game-screen';
import App from './app';

const SCREENS = {
	'initial': InitialScreen,
	'game': GameScreen,
}

export default class ScreenManager {
	constructor() {
		this.newScreen = null;
		this.isTransitioning = false;
		this.container = null;
		
		this.currentScreen = new InitialScreen(
			App.instance.renderer.height,
			App.instance.renderer.width,
			ScreenManager.instance,
			InputManager.instance,
		);
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

	transition(elapsedTime) {
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

	update(elapsedTime) {
		this.currentScreen.update(elapsedTime);
		this.transition(elapsedTime);
	}
}