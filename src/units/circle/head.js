import * as PIXI from 'pixi.js';

export default class HeadCell {
    constructor(x, y, width) {
        this.speed = 5;
        this.speedX = 0;
        this.speedY = 0;
        this.rotationSpeed = 0.1;

        this.closing = false;
        this.opening = false;
        this.animation = null;
        this.eating = false;
        this.width = width;
        this.eatingTime = 600;
        this.eatingTimeElapsed = 0;
        this.target = null;

        this.container = new PIXI.Container();
        this.x = x;
        this.y = y;

        this.indend = this.width / 10;
        this.jawsRotationSpeed = 0.03;
        this.jawsLineWidth = 3;
    }

    get x() {
        return this.container.x;
    }

    get y() {
        return this.container.y;
    }

    set x(value) {
        this.container.x = value;
    }

    set y(value) {
        return this.container.y = value;
    }

    set rotation(value) {
        this.container.rotation = value;
    }

    get rotation() {
        return this.container.rotation;
    }

    load(container) {
        this.graphics = new PIXI.Graphics();
        this.draw();
        this.container.addChild(this.graphics);
        container.addChild(this.container);
    }

    unload(container) {
        container.removeChild(this.container);
    }

    draw() {
        this.graphics.clear();

        const angleStep = Math.PI * 2 / 3;
        const angle = Math.PI / 6;
        const triangleWidth = this.width / 3 * 2;

        for (let i = 0; i < 3; i++) {
            let point1X = Math.cos(angleStep * i) * this.indend;
            let point1Y = Math.sin(angleStep * i) * this.indend;
            let point2X = Math.cos(angle * -1 + angleStep * i) * triangleWidth;
            let point2Y = Math.sin(angle * -1 + angleStep * i) * triangleWidth;
            let point3X = Math.cos(angle + angleStep * i) * triangleWidth;
            let point3Y = Math.sin(angle + angleStep * i) * triangleWidth;

            this.graphics.beginFill(0xDE3249, 1);
            this.graphics.lineStyle(0, 0xDE3249, 1);
            this.graphics.moveTo(point1X, point1Y);
            this.graphics.lineTo(point2X, point2Y);
            this.graphics.lineTo(point3X, point3Y);
            this.graphics.lineTo(point1X, point1Y);
            this.graphics.endFill();
        }

        this.graphics.lineStyle(this.jawsLineWidth, 0xDE3249, 1);
        this.graphics.drawCircle(0, 0, this.width);

        this.graphics.x = 10;
        this.graphics.y = 10;
    }

    update({ elapsed }) {
        if (this.eating && this.eatingTimeElapsed < this.eatingTime) {
            this.eatingTimeElapsed += elapsed;
            this.jawsRotationSpeed = 0.2;
        } else {
            this.eating = false;
            this.eatingTimeElapsed = 0;
            this.jawsRotationSpeed = 0.03;
        }
        this.draw();
        this.move(this.target.x, this.target.y);
    }

    eat() {
        this.eating = true;
    }

    move(x, y) {
        const dy = y - this.y;
        const dx = x - this.x;

        const targetAngle = Math.atan2(dy, dx);
        let rotationSign = 1;

        if (this.rotation - targetAngle > Math.PI) {
            this.rotation -= Math.PI * 2;
        }

        if (this.rotation - targetAngle < -Math.PI) {
            this.rotation += Math.PI * 2;
        }

        if (this.rotation > targetAngle + this.rotationSpeed) {
            this.rotation -= this.rotationSpeed;
            rotationSign = -1;
        }

        if (this.rotation < targetAngle - this.rotationSpeed) {
            this.rotation += this.rotationSpeed;
            rotationSign = 1;
        }

        this.speedX = Math.cos(this.rotation) * this.speed;
        this.speedY = Math.sin(this.rotation) * this.speed;

        this.x += this.speedX;
        this.y += this.speedY;

        this.graphics.rotation += rotationSign * this.jawsRotationSpeed;

    }
}
