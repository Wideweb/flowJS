import Snake from '../units/snake';
import BackgroundCell from '../units/background';
import FoodCell from '../units/food';
import Cell from '../units/cell';
import Line from '../units/line';

import Circle from '../units/circle';

const FOOD_NUMBER = 50;
const BACKGROUND_CELLS = 50;

export default class GameScreen {
    constructor(height, width, screenManager, inputManager) {
        this.height = height;
        this.width = width;
        this.screenManager = screenManager;
        this.inputManager = inputManager;

        this.snake = null;
        this.backgroundCell = [];
        this.enemies = [];
        this.food = [];

        this.container = null;

        this.eatable = [];
    }

    load(container) {
        for (let i = 0; i < FOOD_NUMBER; i++) {
            const x = Math.random() * this.width * 4 - this.width * 2;
            const y = Math.random() * this.height * 4 - this.height * 2;
            const cell = new BackgroundCell(x, y, Math.random() * 300, Math.random() / 10 + 0.05);

            cell.load(container);
            this.backgroundCell.push(cell);
        }

        for (let i = 0; i < 5; i++) {
            const x = Math.random() * this.width * 2 - this.width;
            const y = Math.random() * this.height * 2 - this.height;
            const cell = new Circle(x, y, 10 + Math.random() * 20);

            cell.load(container);
            this.enemies.push(cell);
        }

        for (let i = 0; i < 5; i++) {
            const x = Math.random() * this.width * 2 - this.width;
            const y = Math.random() * this.height * 2 - this.height;
            const cell = new Snake(x, y, 10 + Math.random() * 20);

            cell.load(container);
            this.enemies.push(cell);
        }

        for (let i = 0; i < BACKGROUND_CELLS; i++) {
            const x = Math.random() * this.width * 4 - this.width * 2;
            const y = Math.random() * this.height * 4 - this.height * 2;
            const cell = new FoodCell(x, y, 10);

            cell.load(container);
            this.food.push(cell);
        }

        this.snake = new Snake(this.width / 2, this.height / 2, 20);
        this.snake.load(container);

        this.container = container;

        this.eatable = [...this.food, ...this.enemies.map(e => e.body)];
    }

    unload(container) {
        this.inputManager.unsubscribeOnMove(this.onPointerMove);

        this.backgroundCell.forEach(cell => cell.unload(container));
        this.enemies.forEach(cell => cell.unload(container));
        this.food.forEach(cell => cell.unload(container));
        this.snake.unload(container);
    }

    update(gameTime) {
        this.snake.target = { x: this.inputManager.pointer.x || 0, y: this.inputManager.pointer.y || 0, width: 0, height: 0 };

        this.backgroundCell.forEach(cell => cell.update(gameTime));
        this.enemies.forEach(cell => cell.update(gameTime));
        this.food.forEach(cell => cell.update(gameTime));
        this.snake.update(gameTime);

        this.container.x = -this.snake.x + this.width / 2;
        this.container.y = -this.snake.y + this.height / 2;

        if (this.snake.eating) {
            return;
        }

        for (let i = 0; i < this.food.length; i++) {
            if (Math.abs(this.food[i].x - this.snake.x) + Math.abs(this.food[i].y - this.snake.y) < 80) {
                this.food[i].unload(this.container);
                this.food.splice(i, 1);
                this.snake.eat();

                //let lastCell = this.snake.body[this.snake.body.length - 1];

                //const x = lastCell.x;
                //const y = lastCell.y;
                //const cell = new Cell(x, y, 20 - this.snake.body.length / 4, lastCell);
                //const line = new Line(lastCell, cell)

                //this.snake.body.push(cell);
                //this.snake.lines.push(line);

                //line.load(this.container);
                //cell.load(this.container);

                return;
            }
        }
    }
}