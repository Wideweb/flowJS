import { Container } from 'pixi.js';
import MenuManager from '../menu/menu-manager';
import BaseScreen from './base-screen';
import { IAppTime } from '../app';

export default class MenuScreen extends BaseScreen {

	private menuManager: MenuManager;

	load(parent: Container) {
		this.menuManager = new MenuManager('start', this.height, this.width, this.screenManager);
		this.menuManager.load(parent);
	}

	unload(parent: Container) {
		this.menuManager.unload(parent);
	}

	update(gameTime: IAppTime) {
		this.menuManager.update(gameTime);
	}
}