import HeadCell from './head';
import Cell from './cell';

const BODY_CELL_WIDTH = 15;
const BODY_CELLS = 3;

export default class Circle {
    constructor(x, y, width) {
        this.head = new HeadCell(x, y, width);
        this.body = [];
        this.bodyMap = {};
        this.lines = [];
        for (let i = 0; i < BODY_CELLS; i++) {
            const cell = new Cell(x, y, BODY_CELL_WIDTH);
            cell.onDie.push(() => this.onHit(cell));
            this.body.push(cell);
            this.bodyMap[cell.id] = cell;
        }
        this.bodyRotation = 0;
        this.target = { x, y };

        this.onDie = [];
        this.onAttacked = null;
        this.width = width;
        this.updateHead();
        this.speed = this.initSpeed = 5;
    }

    set speed(value) {
        this.head.speed = value;
    }

    get speed() {
        return this.head.speed;
    }

    get attackRange() {
        return this.head.width * 1.5;
    }

    get x() {
        return this.head.x;
    }

    set x(value) {
        this.head.x = value;
        this.body.forEach(c => c.x = value);
    }

    get y() {
        return this.head.y;
    }

    set y(value) {
        this.head.y = value;
        this.body.forEach(c => c.y = value);
    }

    set target(value) {
        this.head.target = value;
    }

    get eating() {
        return this.head.eating;
    }

    eat() {
        const cell = new Cell(this.x, this.y, BODY_CELL_WIDTH);
        cell.onDie.push(() => this.onHit(cell));
        cell.load(this.container);
        this.body.push(cell);
        this.body.forEach(cell => cell.eat());
        this.head.eat();
        this.bodyMap[cell.id] = cell;

        this.updateHead();

        return cell;
    }

    onHit(cell) {
        cell.unload(this.container);
        this.body.splice(this.body.indexOf(cell), 1);
        delete this.bodyMap[cell.id];
        this.updateHead();

        if (this.onAttacked) {
            this.onAttacked();
        }

        if (this.body.length === 0) {
            this.die();
        }
    }

    updateHead() {
        this.head.width = this.width + this.body.length * this.width / 20;
    }

    die() {
        this.onDie.forEach(h => h(this));
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
            const x = this.x + Math.cos(Math.PI * 2 / cellsNumber * i + this.bodyRotation) * (cellsNumber * 5 + this.head.width * 1.2);
            const y = this.y + Math.sin(Math.PI * 2 / cellsNumber * i + this.bodyRotation) * (cellsNumber * 5 + this.head.width * 1.2);

            cell.target = { x, y };
            cell.update(gameTime);
        });
        this.head.update(gameTime);

        if (this.speed > this.initSpeed) {
            this.speed -= 0.05;
        }
    }
}