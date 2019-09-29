import * as PIXI from 'pixi.js';
import BaseScreen from './base-screen';

export default class InitialScreen extends BaseScreen {
	constructor(height, width, screenManager, inputManager) {
		super(
			height,
			width,
			screenManager,
			inputManager,
		);

		this.delay = 2000;
		this.graphics = null;
	}

	load(container) {
		const fontSize = this.width / 10;
		const messageText = 'aRms';
		const message = new PIXI.Text(messageText, { fontSize, fill: 'white', align: 'center' });
		message.position.x = this.width / 2 - message.width / 2;
		message.position.y = this.height / 2 - fontSize / 2;
		this.graphics = message;

		container.addChild(this.graphics);
	}

	unload(container) {
		container.removeChild(this.graphics);
	}

	update(gameTime) {
		if (gameTime.total > this.delay && !this.screenManager.isTransitioning) {
			this.screenManager.goTo('dev');
		}
	}
}