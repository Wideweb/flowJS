import * as PIXI from 'pixi.js';
import ScreenManager from './screen-manager';

export default class App {
    static get instance() {
        if (!App._instance) {
            App._instance = new PIXI.Application({ width: window.innerWidth - 16, height: window.innerHeight - 20, backgroundColor: 0x560001 });
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

            const message = new PIXI.Text("© Alkevich Entertainment", { fontSize: 15, fill: 'white' });
            message.alpha = 0.7;
            message.position.x = window.innerWidth - message.width - 30;
            message.position.y = window.innerHeight - 50;
            App._instance.stage.addChild(message);
        }

        return App._instance;
    }
}