import * as PIXI from 'pixi.js';

export default class Cell {
    constructor(x, y, width, target) {
        this.target = target;
        this.graphics = new PIXI.Graphics();

        this.width = width;

        this.speed = 5;
        this.a = 0.2;
        this.speedX = 0;
        this.speedY = 0;
        this.rotationSpeed = 0.03;

        this.graphics.x = x;
        this.graphics.y = y;

        this.position = { x, y };
    }

    get x() {
        return this.graphics.x;
    }

    get y() {
        return this.graphics.y;
    }

    set x(value) {
        this.graphics.x = value;
    }

    set y(value) {
        return this.graphics.y = value;
    }

    set rotation(value) {
        this.graphics.rotation = value;
    }

    get rotation() {
        return this.graphics.rotation;
    }

    get targetAngle() {
        const dy = this.target.y - this.y;
        const dx = this.target.x - this.x;

        return Math.atan2(dy, dx);
    }

    load(container) {
        container.addChild(this.graphics);
    }

    unload(container) {
        container.removeChild(this.graphics);
    }

    draw() {
        this.graphics.clear();
        this.graphics.lineStyle(2, 0xFF657F, 1);
        this.graphics.moveTo(-this.width, -this.width);
        this.graphics.lineTo(0, 0);
        this.graphics.closePath();
        this.graphics.moveTo(-this.width, this.width);
        this.graphics.lineTo(0, 0);
        this.graphics.closePath();

        this.graphics.lineStyle(0);
        this.graphics.beginFill(0xDE3249, 1);
        this.graphics.drawCircle(0, 0, this.width / 2);
        this.graphics.endFill();
    }

    update() {
        this.draw();

        if (!this.target) {
            return;
        }

        this.move(this.target.x, this.target.y);
    }

    move(x, y) {
        const dy = y - this.y;
        const dx = x - this.x;

        this.graphics.rotation = Math.atan2(dy, dx);

        const moveX = Math.cos(this.graphics.rotation) * this.a;
        const moveY = Math.sin(this.graphics.rotation) * this.a;

        if (moveX > 0 && this.speedX < 1.5) {
            this.speedX += moveX;
        }

        if (moveX < 0 && this.speedX > -1.5) {
            this.speedX += moveX;
        }

        if (moveY > 0 && this.speedY < 1.5) {
            this.speedY += moveY;
        }

        if (moveY < 0 && this.speedY > -1.5) {
            this.speedY += moveY;
        }

        if (Math.abs(dx) + Math.abs(dy) < this.width / 2 + this.target.width / 2) {
            this.speedX = 0;
            this.speedY = 0;
        }

        const targetDist = this.width / 2 + this.target.width / 2;
        const currentDist = Math.abs(dx) + Math.abs(dy);
        if (currentDist > targetDist) {
            this.position.x += Math.cos(this.graphics.rotation) * currentDist / targetDist * 1.2;
            this.position.y += Math.sin(this.graphics.rotation) * currentDist / targetDist * 1.2;
        }

        this.position.x += this.speedX;
        this.position.y += this.speedY;

        this.graphics.x = this.position.x;
        this.graphics.y = this.position.y;
    }
}
