import HeadCell from './head';
import Cell from '../cell';
import Line from '../line';

const BODY_CELLS = 3;

export default class Snake {
    constructor(x, y, width) {
        this.width = width;
        this.head = new HeadCell(x, y, width);
        this.body = [];
        this.lines = [];
        for (let i = 0; i < BODY_CELLS; i++) {
            const target = i > 0 ? this.body[i - 1] : this.head;
            const cell = new Cell(x - width * i, y, width - i / 4, target);
            const line = new Line(target, cell);
            
            cell.onDie = () => this.onHit(cell);

            this.body.push(cell);
            this.lines.push(line);
        }

        this.target = { x, y };
        this.food = [];
        this.attackRange = this.width * 4;

        this.onDie = null;
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

    eat(item) {
        this.head.eat();
        let lastCell = this.body[this.body.length - 1];
        const x = lastCell.x;
        const y = lastCell.y;
        const cell = new Cell(x, y, this.width - this.body.length / 4, lastCell);
        const line = new Line(lastCell, cell)

        cell.onDie = () => this.onHit(cell);

        this.body.push(cell);
        this.lines.push(line);

        line.load(this.container);
        cell.load(this.container);
    }

    onHit(cell) {
        const index = this.body.indexOf(cell);

        const prevCell = this.body[index - 1] || this.head;
        const nextCell = this.body[index + 1];
        const line = this.lines[index];
        const nextLine = this.lines[index + 1];

        if (nextCell) {
            nextLine.from = nextCell.target = prevCell;
        }

        cell.unload(this.container);
        line.unload(this.container);

        this.body.splice(index, 1);
        this.lines.splice(index, 1);
        
        if (this.body.length === 0) {
            this.die();
        }
    }

    die() {
        if (this.onDie) {
            this.onDie(this);
        }
    }

    load(container) {
        this.lines.forEach(line => line.load(container));
        this.body.forEach(cell => cell.load(container));
        this.head.load(container);
        this.container = container;
    }

    unload(container) {
        this.lines.forEach(line => line.unload(container));
        this.body.forEach(cell => cell.unload(container));
        this.head.unload(container);
    }

    update() {
        this.body.forEach(cell => cell.update());
        this.lines.forEach(line => line.update());
        this.head.update();
    }
}