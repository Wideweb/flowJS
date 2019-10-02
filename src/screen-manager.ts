import { Container } from 'pixi.js';
import InputManager from './input-manager';
import InitialScreen from './screens/initial-screen';
import MenuScreen from './screens/menu-screen';
import BaseScreen from './screens/base-screen';
import GameScreen from './screens/game-screen';
import { IAppTime } from './app';

class ScreenFactory {
	static create(type: string, height: number, width: number): BaseScreen {
		switch (type) {
			case 'initial':
				return new InitialScreen(height, width, ScreenManager.instance, InputManager.instance);
			case 'menu':
				return new MenuScreen(height, width, ScreenManager.instance, InputManager.instance);
			case 'game':
				return new GameScreen(height, width, ScreenManager.instance, InputManager.instance);
		}

		return new InitialScreen(height, width, ScreenManager.instance, InputManager.instance);;
	}
}

export default class ScreenManager {

	public data: any;
	public width: number = 550;
	public height: number = 400;
	public isTransitioning: boolean;

	private currentScreen: BaseScreen;
	private newScreen: BaseScreen;
	private container: any;

	private static _instance: ScreenManager;

	static get instance(): ScreenManager {
		if (!ScreenManager._instance) {
			ScreenManager._instance = new ScreenManager();
		}

		return ScreenManager._instance;
	}

	goTo(screen: string, data?: any): void {
		if (!this.isTransitioning) {
			this.data = data;
			this.newScreen = ScreenFactory.create(screen, this.height, this.width);
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

	load(container: Container): void {
		this.container = container;
		this.data = {};
		this.currentScreen = ScreenFactory.create('initial', this.height, this.width);
		this.currentScreen.load(container);
	}

	unload(container: Container): void {
		this.currentScreen.unload(container);
	}

	update(gameTime: IAppTime): void {
		this.currentScreen.update(gameTime);
		this.transition(gameTime);
	}
}