import BaseScreen from './base-screen';
import { Container, Text } from 'pixi.js';
import { IAppTime } from '../app';

export default class InitialScreen extends BaseScreen {

	private graphics: Text;
	private delay: number = 2000;

	load(parent: Container) {
		const fontSize = this.width / 10;
		const messageText = 'aRms';
		const message = new Text(messageText, { fontSize, fill: 'white', align: 'center' });
		message.position.x = this.width / 2 - message.width / 2;
		message.position.y = this.height / 2 - fontSize / 2;
		this.graphics = message;

		parent.addChild(this.graphics);
	}

	unload(parent: Container) {
		parent.removeChild(this.graphics);
	}

	update(gameTime: IAppTime) {
		if (gameTime.total > this.delay && !this.screenManager.isTransitioning) {
			this.screenManager.goTo('menu');
		}
	}
}