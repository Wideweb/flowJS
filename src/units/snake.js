import HeadCell from './head';
import Cell from './cell';
import Line from './line';

const BODY_CELL_WIDTH = 20;
const BODY_CELLS = 3;

export default class Snake {
	constructor(x, y) {
		this.head = new HeadCell(x, y);
		this.body = [];
		this.lines = [];
		for (let i = 0; i < BODY_CELLS; i++) {
			const target = i > 0 ? this.body[i - 1] : this.head;
			const cell = new Cell(x - BODY_CELL_WIDTH * i, y, BODY_CELL_WIDTH - i / 4, target);
			const line = new Line(target, cell);

			this.body.push(cell);
			this.lines.push(line);
		}
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
		this.head.eat();
	}

	load(container) {
		this.lines.forEach(line => line.load(container));
		this.body.forEach(cell => cell.load(container));
		this.head.load(container);
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