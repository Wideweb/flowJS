import ScreenManager from './screen-manager';
import { Application, Text, Rectangle } from 'pixi.js';

export class IAppTime {
	elapsed: number;
	total: number;
}

export default class App {

	static _instance: Application;
	static time: number;

	static get instance() {
		if (!App._instance) {
			App._instance = new Application({ width: window.innerWidth - 16, height: window.innerHeight - 20, backgroundColor: 0x560001 });
			App._instance.stage.hitArea = new Rectangle(
				0,
				0,
				App._instance.renderer.width / App._instance.renderer.resolution,
				App._instance.renderer.height / App._instance.renderer.resolution
			);
			App._instance.stage.interactive = true;
			App._instance.renderer.autoResize = true;


			ScreenManager.instance.width = App._instance.renderer.width;
			ScreenManager.instance.height = App._instance.renderer.height;
			ScreenManager.instance.load(App._instance.stage);

			App.time = 0;
			App._instance.ticker.add(() =>
				ScreenManager.instance.update({
					elapsed: App._instance.ticker.elapsedMS,
					total: App.time += App._instance.ticker.elapsedMS
				})
			);

			const message = new Text("© Alkevich Entertainment", { fontSize: 15, fill: 'white' });
			message.alpha = 0.7;
			message.position.x = window.innerWidth - message.width - 30;
			message.position.y = window.innerHeight - 50;
			App._instance.stage.addChild(message);
		}

		return App._instance;
	}
}