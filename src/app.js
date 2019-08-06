import * as PIXI from 'pixi.js';
import ScreenManager from './screen-manager';

export default class App {
	static get instance() {
		if (!App._instance) {
			App._instance = new PIXI.Application({ width: window.innerWidth - 16, height: window.innerHeight - 20, backgroundColor: 0x560001 });
			App._instance.stage.interactive = true;

			ScreenManager.instance.load(App._instance.stage);
			App._instance.ticker.add((elapsedTime) => ScreenManager.instance.update(elapsedTime));
		}

		return App._instance;
	}
}