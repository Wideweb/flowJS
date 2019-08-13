import HeadCell from './head';
import Cell from './cell';

const BODY_CELL_WIDTH = 15;
const BODY_CELLS = 3;

export default class Circle {
    constructor(x, y, width) {
        this.head = new HeadCell(x, y, width);
        this.body = [];
        this.lines = [];
        for (let i = 0; i < BODY_CELLS; i++) {
            this.body.push(new Cell(x, y, BODY_CELL_WIDTH));
        }
        this.bodyRotation = 0;
        this.target = { x, y };
    }

    get width() {
        return this.head.width;
    }

    get x() {
        return this.head.x;
    }

    get y() {
        return this.head.y;
    }

    set target(value) {
        this.head.target = value;
    }

    get eating() {
        return this.head.eating;
    }

    eat() {
        const cell = new Cell(this.x, this.y, BODY_CELL_WIDTH);
        cell.load(this.container);
        this.body.push(cell);
        this.body.forEach(cell => cell.eat());
        this.head.eat();
    }

    load(container) {
        this.body.forEach(cell => cell.load(container));
        this.head.load(container);
        this.container = container;
    }

    unload(container) {
        this.body.forEach(cell => cell.unload(container));
        this.head.unload(container);
    }

    update(gameTime) {
        this.bodyRotation += 0.03;
        const cellsNumber = this.body.length < 6 ? 6 : this.body.length;
        this.body.forEach((cell, i) => {
            const x = this.x + Math.cos(Math.PI * 2 / cellsNumber * i + this.bodyRotation) * (cellsNumber * 5 + this.head.with * 1.2);
            const y = this.y + Math.sin(Math.PI * 2 / cellsNumber * i + this.bodyRotation) * (cellsNumber * 5 + this.head.with * 1.2);

            cell.target = { x, y };
            cell.update(gameTime);
        });
        this.head.update(gameTime);
    }
}