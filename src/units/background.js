import Cell from './cell';

export default class BackgroundCell extends Cell {
    constructor(x, y, width, alpha) {
        super(x, y, width, null);

        this.alpha = alpha;
    }

    draw() {
        this.graphics.clear();
        this.graphics.lineStyle(0);
        this.graphics.beginFill(0xDE3249, this.alpha);
        this.graphics.drawCircle(0, 0, this.width / 2);
        this.graphics.endFill();
    }

    update() {
        this.draw();
        this.move();
    }

    move() {
        this.graphics.x = this.position.x;
        this.graphics.y = this.position.y;
    }
}
