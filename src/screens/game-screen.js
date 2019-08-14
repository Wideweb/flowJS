import JobManager from '../utils/job-manager';
import Snake from '../units/snake';
import BackgroundCell from '../units/background';
import FoodCell from '../units/food';

import Circle from '../units/circle';

const FOOD_NUMBER = 50;
const BACKGROUND_CELLS = 50;

export default class GameScreen {
    constructor(height, width, screenManager, inputManager) {
        this.height = height;
        this.width = width;
        this.screenManager = screenManager;
        this.inputManager = inputManager;

        this.player = null;
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
            const circle = new Circle(x, y, 10 + Math.random() * 20);

            circle.load(container);
            this.enemies.push(circle);

            circle.onDie = () => {
                circle.unload(container);
                this.enemies.splice(this.enemies.indexOf(circle), 1)
            };
        }

        for (let i = 0; i < 5; i++) {
            const x = Math.random() * this.width * 2 - this.width;
            const y = Math.random() * this.height * 2 - this.height;
            const snake = new Snake(x, y, 10 + Math.random() * 20);

            snake.load(container);
            this.enemies.push(snake);

            snake.onDie = () => {
                snake.unload(container);
                this.enemies.splice(this.enemies.indexOf(snake), 1)
            };
        }

        for (let i = 0; i < BACKGROUND_CELLS; i++) {
            const x = Math.random() * this.width * 4 - this.width * 2;
            const y = Math.random() * this.height * 4 - this.height * 2;
            const cell = new FoodCell(x, y, 10);

            cell.load(container);
            this.food.push(cell);
            cell.onDie = () => {
                cell.unload(container);
                this.food.splice(this.food.indexOf(cell), 1)
            };
        }

        this.player = new Snake(this.width / 2, this.height / 2, 20);
        this.player.load(container);

        this.container = container;

        this.eatable = [...this.food, ...this.enemies.map(e => e.body).flat()];

        [this.player].forEach((unit) => {
            JobManager.instance.addJob(this.eatable, (item, index) => {
                if (!unit.eating && Math.abs(item.x - unit.x) + Math.abs(item.y - unit.y) < unit.attackRange) {
                    item.die();
                    unit.eat(item);
                    this.eatable.splice(index, 1);
                    console.log(this.eatable.length);
                    return true;
                }
                return false;
            }, true);
        })
    }

    unload(container) {
        this.inputManager.unsubscribeOnMove(this.onPointerMove);

        this.backgroundCell.forEach(cell => cell.unload(container));
        this.enemies.forEach(cell => cell.unload(container));
        this.food.forEach(cell => cell.unload(container));
        this.player.unload(container);
    }

    update(gameTime) {
        this.player.target = { x: this.inputManager.pointer.x || 0, y: this.inputManager.pointer.y || 0, width: 0, height: 0 };

        this.backgroundCell.forEach(cell => cell.update(gameTime));
        this.enemies.forEach(cell => cell.update(gameTime));
        this.food.forEach(cell => cell.update(gameTime));
        this.player.update(gameTime);

        this.container.x = -this.player.x + this.width / 2;
        this.container.y = -this.player.y + this.height / 2;
    }
}
