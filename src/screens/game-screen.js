import Snake from '../units/snake';
import BackgroundCell from '../units/background';
import FoodCell from '../units/food';

const FOOD_NUMBER = 10;
const BACKGROUND_CELLS = 10;

export default class GameScreen {
    constructor(height, width, inputManager) {
        this.height = height;
        this.width = width;
        this.inputManager = inputManager;

        this.snake = null;
        this.backgroundCell = [];
        this.food = [];

        this.onPointerMove = this.onPointerMove.bind(this);
    }

    load(container) {
        for (let i = 0; i < FOOD_NUMBER; i++) {
            const x = Math.random() * this.width;
            const y = Math.random() * this.height;
            const cell = new BackgroundCell(x, y, Math.random() * 300, Math.random() / 10 + 0.05);

            this.backgroundCell.push(cell);
            container.addChild(cell.graphics);
        }

        for (let i = 0; i < BACKGROUND_CELLS; i++) {
            const x = Math.random() * this.width;
            const y = Math.random() * this.height;
            const cell = new FoodCell(x, y, 10);

            this.food.push(cell);
            container.addChild(cell.graphics);
        }

        this.snake = new Snake(this.width / 2, this.height / 2);
        this.snake.load(container);

        this.inputManager.onPointerMove(this.onPointerMove);
    }

    unload(container) {
        this.inputManager.unsubscribeOnMove(this.onPointerMove);

        this.backgroundCell.forEach(cell => cell.unload(container));
        this.food.forEach(cell => cell.unload(container));
        this.snake.unload(container);
    }

    update() {
        this.backgroundCell.forEach(cell => cell.update());
        this.food.forEach(cell => cell.update());
        this.snake.update();

        //if (this.snake.eating) {
        //    return;
        //}
        //
        //for (let i = 0; i < this.food.length; i++) {
        //    if (Math.abs(this.food[i].x - this.snake.x) + Math.abs(this.food[i].y - this.snake.y) < 80) {
        //        app.stage.removeChild(this.food[i].graphics);
        //        food.splice(i, 1);
        //        this.snake.eat();
        //
        //        let lastCell = snake[snake.length - 1];
        //
        //        const x = lastCell.x;
        //        const y = lastCell.y;
        //        const cell = new Cell(x, y, 20 - snake.length, lastCell);
        //        const line = new CellLine(lastCell, cell)
        //
        //        snake.push(cell);
        //        lines.push(line);
        //
        //        app.stage.addChild(line.graphics);
        //        app.stage.addChild(cell.graphics);
        //
        //        return;
        //    }
        //}
    }

    onPointerMove({ x, y }) {
        this.snake.target = { x, y, width: 0, height: 0 };
    }
}