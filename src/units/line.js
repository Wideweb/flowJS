import * as PIXI from 'pixi.js';

export default class Line {
    constructor(from, to) {
        this.from = from;
        this.to = to;

        this.graphics = new PIXI.Graphics();
        this.graphics.x = 0;
        this.graphics.y = 0;
    }

    load(container) {
        container.addChild(this.graphics);
    }

    unload(container) {
        container.removeChild(this.graphics);
    }

    update() {
        this.graphics.clear();
        this.graphics.lineStyle(2, 0xFF657F, 1);
        this.graphics.moveTo(this.from.x, this.from.y);
        this.graphics.lineTo(this.to.x, this.to.y);
        this.graphics.closePath();
    }
}
