import Cell from './cell';

export default class FoodCell extends Cell {
    draw() {
        this.graphics.clear();
        this.graphics.lineStyle(0);
        this.graphics.beginFill(0xDE3249);
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
