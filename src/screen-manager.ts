import InputManager from './input-manager';
import InitialScreen from './screens/initial-screen';
import MenuScreen from './screens/menu-screen';
import GameScreen from './screens/game-screen';
import BaseScreen from './screens/base-screen';
import DevScreen from './screens/dev-screen';
import { IAppTime } from './app';

const SCREENS = {
	'initial': InitialScreen,
	'game': GameScreen,
	'menu': MenuScreen,
	'dev': DevScreen,
}

export default class ScreenManager {

	public data: any;
	public width: number = 550;
	public height: number = 400;

	private currentScreen: BaseScreen;
	private newScreen: BaseScreen;
	private isTransitioning: boolean;
	private container: any;

	private static _instance: ScreenManager;

	static get instance(): ScreenManager {
		if (!ScreenManager._instance) {
			ScreenManager._instance = new ScreenManager();
		}

		return ScreenManager._instance;
	}

	goTo(screen: string, data: any): void {
		if (!this.isTransitioning) {
			this.data = data;
			this.newScreen = new SCREENS[screen](this.height, this.width, ScreenManager.instance, InputManager.instance);
			this.isTransitioning = true;
		}
	}

	transition(gameTime: IAppTime): void {
		if (this.isTransitioning) {
			this.currentScreen.unload(this.container);
			this.currentScreen = this.newScreen;
			this.currentScreen.load(this.container);
			this.isTransitioning = false;
		}
	}

	load(container): void {
		this.container = container;
		this.data = {};
		this.currentScreen = new InitialScreen(this.height, this.width, ScreenManager.instance, InputManager.instance);
		this.currentScreen.load(container);
	}

	unload(container): void {
		this.currentScreen.unload(container);
	}

	update(gameTime: IAppTime): void {
		this.currentScreen.update(gameTime);
		this.transition(gameTime);
	}
}