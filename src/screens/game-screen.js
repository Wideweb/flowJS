import * as PIXI from 'pixi.js';
import JobManager from '../utils/job-manager';
import Graphics from '../utils/graphics';
import UnitController from '../artificial-intelligence/unit-controller';
import Snake from '../units/snake';
import BackgroundCell from '../units/background';
import FoodCell from '../units/food';
import Circle from '../units/circle';
import Formulas from '../utils/formulas';

const FOOD_NUMBER = 10;
const BACKGROUND_CELLS = 15;

export default class GameScreen {
    constructor(screenHeight, screenWidth, screenManager, inputManager) {
        this.screenHeight = screenHeight;
        this.screenWidth = screenWidth;
        this.mapHeight = screenHeight * 2;
        this.mapWidth = screenWidth * 2;
        this.screenManager = screenManager;
        this.inputManager = inputManager;

        this.player = null;
        this.backgroundCell = [];
        this.enemies = [];
        this.food = [];

        this.parent = null;
        this.container = new PIXI.Container();

        this.eatable = [];
        this.unitControllers = [];
    }

    load(parent) {
        this.parent = parent;
        this.parent.addChild(this.container);

        for (let i = 0; i < BACKGROUND_CELLS; i++) {
            const x = Math.random() * this.mapWidth;
            const y = Math.random() * this.mapHeight;
            const cell = new BackgroundCell(x, y, Math.random() * 300, Math.random() / 10 + 0.05);

            cell.load(this.container);
            this.backgroundCell.push(cell);
        }

        for (let i = 0; i < FOOD_NUMBER; i++) {
            const x = Math.random() * this.mapWidth;
            const y = Math.random() * this.mapHeight;
            const cell = new FoodCell(x, y, 10);

            cell.load(this.container);
            this.food.push(cell);
            cell.onDie.push(() => {
                cell.unload(this.container);
                this.food.splice(this.food.indexOf(cell), 1)
            });
        }

        for (let i = 0; i < 3; i++) {
            const x = Math.random() * this.mapWidth;
            const y = Math.random() * this.mapHeight;
            const circle = new Circle(x, y, 10 + Math.random() * 20);

            circle.load(this.container);
            this.enemies.push(circle);
            this.unitControllers.push(new UnitController(circle, this.mapWidth, this.mapHeight, this));

            circle.onDie.push(() => {
                circle.unload(this.container);
                this.enemies.splice(this.enemies.indexOf(circle), 1)
            });
        }

        for (let i = 0; i < 3; i++) {
            const x = Math.random() * this.mapWidth;
            const y = Math.random() * this.mapHeight;
            const snake = new Snake(x, y, 10 + Math.random() * 20);

            snake.load(this.container);
            this.enemies.push(snake);
            this.unitControllers.push(new UnitController(snake, this.mapWidth, this.mapHeight, this));

            snake.onDie.push(() => {
                snake.unload(this.container);
                this.enemies.splice(this.enemies.indexOf(snake), 1)
            });
        }

        if (this.screenManager.data.hero === 1) {
            this.player = new Snake(this.mapWidth / 2, this.mapHeight / 2, 20);
        } else {
            this.player = new Circle(this.mapWidth / 2, this.mapHeight / 2, 30);
        }

        this.player.onAttacked = () => this.onPlayerAttacked();
        this.player.onDie.push(() => this.screenManager.goTo('menu'));
        this.player.load(this.container);

        const units = [this.player, ...this.enemies];
        const eat = [...this.food, ...units.map(u => u.body).flat()];
        units.forEach((unit) => {
            JobManager.instance.addJob(eat, (item, index) => {
                if (!unit.eating && Math.abs(item.x - unit.x) + Math.abs(item.y - unit.y) < unit.attackRange) {
                    if (unit.bodyMap[item.id]) {
                        return false;
                    }

                    eat.push(unit.eat(item));
                    eat.splice(index, 1);
                    item.die();

                    return true;
                }
                return false;
            }, () => !unit.dead);
        });

        let gradTexture = Graphics.createRadialGradTexture('rgba(255, 0, 0, 0.0)', 'rgba(255, 0, 0, 0.5)');
        this.alarmSprite = new PIXI.Sprite(gradTexture);
        this.alarmSprite.width = this.screenWidth;
        this.alarmSprite.height = this.screenHeight;
        this.alarmSprite.alpha = 0;
        this.parent.addChild(this.alarmSprite);

        JobManager.instance.addJob(this.enemies, this.checkItemPosition.bind(this), () => true);
        JobManager.instance.addJob(this.food, this.checkItemPosition.bind(this), () => true);
        JobManager.instance.addJob(this.backgroundCell, this.checkItemPosition.bind(this), () => true);
    }

    getNewPosition() {
        let x = Formulas.getRandomArbitraryInt(this.player.x - this.screenWidth / 2, this.player.x - this.screenWidth);
        let y = Formulas.getRandomArbitraryInt(this.player.y - this.screenHeight / 2, this.player.y - this.screenHeight);

        return { x, y };
    }

    checkItemPosition(item) {
        if (this.player.x - item.x > this.screenWidth) {
            item.x = this.player.x + (this.player.x - item.x) - item.width;
        }

        if (item.x - this.player.x > this.screenWidth) {
            item.x = this.player.x - (item.x - this.player.x) + item.width;
        }

        if (this.player.y - item.y > this.screenHeight) {
            item.y = this.player.y + (this.player.y - item.y) - item.width;
        }

        if (item.y - this.player.y > this.screenHeight) {
            item.y = this.player.y - (item.y - this.player.y) + item.width;
        }
    }

    onPlayerAttacked() {
        this.attacked = true;
    }

    unload(parent) {
        this.backgroundCell.forEach(cell => cell.unload(this.container));
        this.enemies.forEach(cell => cell.unload(this.container));
        this.food.forEach(cell => cell.unload(this.container));
        this.player.unload(this.container);

        parent.removeChild(this.alarmSprite);
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

        this.container.x = -this.player.x + this.screenWidth / 2;
        this.container.y = -this.player.y + this.screenHeight / 2;

        if (this.attacked) {
            if (this.alarmSprite.alpha < 1) {
                this.alarmSprite.alpha += 0.05;
            } else {
                this.attacked = false;
            }
        }

        if (!this.attacked && this.alarmSprite.alpha > 0) {
            this.alarmSprite.alpha -= 0.05;
        }

        this.unitControllers.forEach(c => c.update(gameTime));
    }
}
