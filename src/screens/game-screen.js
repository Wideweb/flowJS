import * as PIXI from 'pixi.js';
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

        this.parent = null;
        this.container = new PIXI.Container();

        this.eatable = [];
    }

    load(parent) {
        this.parent = parent;
        this.parent.addChild(this.container);

        for (let i = 0; i < FOOD_NUMBER; i++) {
            const x = Math.random() * this.width * 4 - this.width * 2;
            const y = Math.random() * this.height * 4 - this.height * 2;
            const cell = new BackgroundCell(x, y, Math.random() * 300, Math.random() / 10 + 0.05);

            cell.load(this.container);
            this.backgroundCell.push(cell);
        }

        for (let i = 0; i < 5; i++) {
            const x = Math.random() * this.width * 2 - this.width;
            const y = Math.random() * this.height * 2 - this.height;
            const circle = new Circle(x, y, 10 + Math.random() * 20);

            circle.load(this.container);
            this.enemies.push(circle);

            circle.onDie = () => {
                circle.unload(this.container);
                this.enemies.splice(this.enemies.indexOf(circle), 1)
            };
        }

        for (let i = 0; i < 5; i++) {
            const x = Math.random() * this.width * 2 - this.width;
            const y = Math.random() * this.height * 2 - this.height;
            const snake = new Snake(x, y, 10 + Math.random() * 20);

            snake.load(this.container);
            this.enemies.push(snake);

            snake.onDie = () => {
                snake.unload(this.container);
                this.enemies.splice(this.enemies.indexOf(snake), 1)
            };
        }

        for (let i = 0; i < BACKGROUND_CELLS; i++) {
            const x = Math.random() * this.width * 4 - this.width * 2;
            const y = Math.random() * this.height * 4 - this.height * 2;
            const cell = new FoodCell(x, y, 10);

            cell.load(this.container);
            this.food.push(cell);
            cell.onDie = () => {
                cell.unload(this.container);
                this.food.splice(this.food.indexOf(cell), 1)
            };
        }

        if (this.screenManager.data.hero === 1) {
            this.player = new Snake(this.width / 2, this.height / 2, 20);
        } else {
            this.player = new Circle(this.width / 2, this.height / 2, 30);
        }

        this.player.load(this.container);

        const units = [this.player, ...this.enemies];
        const eat = [...this.food, ...units.map(u => u.body).flat()];
        units.forEach((unit) => {
            JobManager.instance.addJob(eat, (item, index) => {
                if (!unit.eating && Math.abs(item.x - unit.x) + Math.abs(item.y - unit.y) < unit.attackRange) {
                    if (unit.bodyMap[item.id]) {
                        return false;
                    }

                    item.die();
                    eat.splice(index, 1);
                    eat.push(unit.eat(item));
                    return true;
                }
                return false;
            }, true);
        });



        let gradTexture = this.createGradTexture('rgba(255, 0, 0, 0.0)', 'rgba(255, 0, 0, 1)');
        let sprite = new PIXI.Sprite(gradTexture);
        sprite.width = this.width;
        sprite.height = this.height;

        this.parent.addChild(sprite);
    }

    createGradTexture(from, to) {
        const quality = 256;
        const canvas = document.createElement('canvas');
        canvas.width = quality;
        canvas.height = quality;

        const ctx = canvas.getContext('2d');

        // use canvas2d API to create gradient
        const grd = ctx.createRadialGradient(quality / 2, quality / 2, quality / 2.5, quality / 2, quality / 2, quality);
        grd.addColorStop(0, from);
        grd.addColorStop(1, to);

        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, quality, quality);

        return PIXI.Texture.from(canvas);
    }

    unload(parent) {
        this.inputManager.unsubscribeOnMove(this.onPointerMove);

        this.backgroundCell.forEach(cell => cell.unload(this.container));
        this.enemies.forEach(cell => cell.unload(this.container));
        this.food.forEach(cell => cell.unload(this.container));
        this.player.unload(this.container);

        parent.removeChild(this.container);
    }

    update(gameTime) {
        this.player.target = { 
            x: this.inputManager.pointer.x - this.container.x || 0,
            y: this.inputManager.pointer.y - this.container.y || 0,
            width: 0,
            height: 0,
        };

        this.backgroundCell.forEach(cell => cell.update(gameTime));
        this.enemies.forEach(cell => cell.update(gameTime));
        this.food.forEach(cell => cell.update(gameTime));
        this.player.update(gameTime);

        this.container.x = -this.player.x + this.width / 2;
        this.container.y = -this.player.y + this.height / 2;
    }
}
