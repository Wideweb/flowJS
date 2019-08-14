import Cell from '../cell';

export default class HeadCell extends Cell {
    constructor(x, y, width) {
        super(x, y, width, null);

        this.rotationSpeed = 0.1;

        this.closing = false;
        this.opening = false;
        this.mouthSpeed = 2;
        this.animation = null;
        this.eating = false;
        this.mouthY = this.width / 2 * 4
    }

    draw() {
        this.graphics.clear();

        this.graphics.lineStyle(0);
        this.graphics.beginFill(0xDE3249, 1);
        this.graphics.drawCircle(0, 0, this.width / 2);
        this.graphics.endFill();

        this.graphics.lineStyle(5, 0xDE3249, 1);
        this.graphics.moveTo(5 * this.width / 2, -1 * this.mouthY);
        this.graphics.bezierCurveTo(-1 * this.width / 2, -5 * this.width / 2, -1 * this.width / 2, 5 * this.width / 2, 5 * this.width / 2, this.mouthY);
    }

    update() {
        super.update();

        if (this.animation) {
            this.animation();
        }
    }

    eat() {
        this.eating = true;
        this.animation = this.animateClose;
    }

    animateClose() {
        if (this.mouthY >= this.width / 2) {
            this.mouthY -= this.mouthSpeed;
        } else {
            this.animation = this.animateOpen;
        }
    }

    animateOpen() {
        if (this.mouthY <= this.width / 2 * 4) {
            this.mouthY += this.mouthSpeed;
        } else {
            this.eating = false;
        }
    }

    move(x, y) {
        const dy = y - this.y;
        const dx = x - this.x;

        const targetAngle = Math.atan2(dy, dx);

        if (this.graphics.rotation - targetAngle > Math.PI) {
            this.graphics.rotation -= Math.PI * 2;
        }

        if (this.graphics.rotation - targetAngle < -Math.PI) {
            this.graphics.rotation += Math.PI * 2;
        }

        if (this.graphics.rotation > targetAngle) {
            this.graphics.rotation -= this.rotationSpeed;
        }

        if (this.graphics.rotation < targetAngle) {
            this.graphics.rotation += this.rotationSpeed;
        }

        this.speedX = Math.cos(this.graphics.rotation) * this.speed;
        this.speedY = Math.sin(this.graphics.rotation) * this.speed;

        this.position.x += this.speedX;
        this.position.y += this.speedY;

        this.graphics.x = this.position.x;
        this.graphics.y = this.position.y;
    }
}
