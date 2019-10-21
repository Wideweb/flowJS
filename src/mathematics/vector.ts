export default class Vector2D {
    public x: number = 0;
    public y: number = 0;

    constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }

    add(v: Vector2D): Vector2D {
        return new Vector2D(this.x + v.x, this.y + v.y);
    }

    sub(v: Vector2D): Vector2D {
        return new Vector2D(this.x - v.x, this.y - v.y);
    }

    div(n: number): Vector2D {
        return new Vector2D(this.x / n, this.y / n);
    }

    mul(n: number): Vector2D {
        return new Vector2D(this.x * n, this.y * n);
    }

    length(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    normalize(): Vector2D {
        return this.div(this.length());
    }

    rotate(angle: number): Vector2D {
        return new Vector2D(
            Math.cos(angle) * this.x + Math.sin(angle) * this.y,
            -1 * Math.sin(angle) * this.x + Math.cos(angle) * this.y,
        );
    }
}
