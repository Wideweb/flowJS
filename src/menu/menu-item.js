import * as PIXI from 'pixi.js';

export default class Menu {
    constructor(height, width, x, y, fontSize, config, onSelect) {
		this.height = height;
		this.width = width;
		this.x = x;
		this.y = y;
		this.fontSize = fontSize;
        this.text = config.text;
        this.type = config.type;
        this.link = config.link;
        this.onSelect = onSelect;
		
		this.message = null;
		this.graphics = null;
    }

    load(container) {
        const message = new PIXI.Text(this.text, { fontSize: this.fontSize, fill: 'white' });
        message.position.x = this.x + this.width / 2 - message.width / 2;
        message.position.y = this.y + this.height / 2 - this.fontSize / 2;
        this.message = message;

        const graphics = new PIXI.Graphics();
        graphics.lineStyle(2, 0xFFFFFF, 1);
        graphics.drawRect(this.x, this.y, this.width, this.height);
        graphics.hitArea = new PIXI.Rectangle(this.x, this.y, this.width, this.height);
        graphics.interactive = true;
        graphics.pointerdown = () => this.onSelect(this.type, this.link);
        this.graphics = graphics;
		
		container.addChild(this.message);
		container.addChild(this.graphics);
    }

    unload(container) {
		container.removeChild(this.message);
		container.removeChild(this.graphics);
    }

    update(gameTime) {
    }
}