import Cell from '../cell';

export default class CircleCell extends Cell {
    constructor(x, y, width, target) {
        super(x, y, width, target);
        this.a = 1;
        this.initWidth = width;
        this.growing = false;
        this.growSpeed = 1;
    }

    draw() {
        this.graphics.clear();
        this.graphics.lineStyle(0);
        this.graphics.beginFill(0xDE3249, 1);
        this.graphics.drawCircle(0, 0, this.width / 2);
        this.graphics.endFill();
    }

    move(x, y) {
        const dy = y - this.y;
        const dx = x - this.x;

        this.graphics.rotation = Math.atan2(dy, dx);

        this.position.x = x;
        this.position.y = y;

        this.graphics.x = this.position.x;
        this.graphics.y = this.position.y;
    }

    eat() {
        this.growing = true;
        this.animation = this.animateGrow;
    }

    animateGrow() {
        if (this.width <= this.initWidth * 1.5) {
            this.width += this.growSpeed;
        } else {
            this.animation = this.animateSqueeze;
        }
    }

    animateSqueeze() {
        if (this.width >= this.initWidth) {
            this.width -= this.growSpeed;
        } else {
            this.growing = false;
        }
    }

    update() {
        this.draw();

        if (this.target) {
            this.move(this.target.x, this.target.y);
        }

        if (this.animation) {
            this.animation();
        }
    }
}
