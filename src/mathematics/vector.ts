export default class Vector2D {
	public x: number = 0;
	public y: number = 0;

	constructor(x: number = 0, y: number = 0) { 
		this.x = x;
		this.y = y;
	}

	add(v: Vector2D) {
		this.x += v.x;
		this.y += v.y;
	}

	sub(v: Vector2D) {
		this.x -= v.x;
		this.y -= v.y;
	}

	div(n: number) {
		this.x /= n;
		this.y /= n;
	}
}
