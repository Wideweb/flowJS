import * as PIXI from 'pixi.js';

export default class Menu {
    constructor(height, width, x, y, fontSize, config) {
		this.height = height;
		this.width = width;
		this.x = x;
		this.y = y;
		this.fontSize = fontSize;
        this.text = config.text;
        this.type = config.type;
		this.link = config.link;
		
		this.graphics = null;
    }

    load(container) {
        const message = new PIXI.Text(this.text, { fontSize: this.fontSize, fill: 'white', align: 'center' });
        message.position.x = this.width / 2 - message.width / 2;
        message.position.y = this.height / 2 - this.fontSize / 2;
        this.graphics = message;
		
		container.addChild(this.graphics);
    }

    unload(container) {
		container.removeChild(this.graphics);
    }

    update(gameTime) {
    }
}