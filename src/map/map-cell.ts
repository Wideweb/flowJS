import { Container, Graphics } from 'pixi.js';
import Vector2D from '../mathematics/vector';
import { GraphConnection } from '../pathfinding/graph';

export enum MapCellType {
    Empty = 0,
    Wall = 1,
}

export default class MapCell {

    private graphics: Graphics;

    public color = 0x0B6623;
    public connections: GraphConnection<MapCell>[];

    constructor(
        public x: number,
        public y: number,
        public type: MapCellType,
        public position: Vector2D,
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
        this.graphics.beginFill(this.type === MapCellType.Empty ? this.color : 0x000000, 1);
        this.graphics.drawRect(this.position.x, this.position.y, this.width, this.height);
        this.graphics.endFill();
    }
}