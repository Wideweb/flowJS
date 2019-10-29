import { Container, Graphics } from 'pixi.js';

export enum MapCellType {
    Empty = 0,
    Wall = 1,
}

export default class MapCell {

    private graphics: Graphics;

    constructor(
        public x: number,
        public y: number,
        public type: MapCellType,
        public width: number,
        public height: number,
    ) { }

    load(parent: Container): void {
        this.graphics = new Graphics();
        parent.addChild(this.graphics);
        this.draw();
    }

    unload(parent: Container): void {
        parent.removeChild(this.graphics);
    }

    update(): void {
        this.draw();
    }

    draw() {
        this.graphics.clear();
        this.graphics.lineStyle(1);
        this.graphics.beginFill(this.type === MapCellType.Empty ? 0x0B6623 : 0x000000, 1);
        this.graphics.drawRect(this.x, this.y, this.width, this.height);
        this.graphics.endFill();
    }
}