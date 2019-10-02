import Static from '../mathematics/static';
import { IAppTime } from '../app';
import { Graphics, Container } from 'pixi.js';
import Vector2D from '../mathematics/vector';

export default class Character {

	private graphics: Graphics;
	private container: Container;
	private location: Static;
	private targetPosition: Vector2D;

	setTarget(position: Vector2D) {
		this.targetPosition = position;
	}

	draw() {
		this.graphics.clear();
		this.graphics.lineStyle(0);
		this.graphics.beginFill(0xDE3249, 1);
		this.graphics.drawCircle(this.location.position.x, this.location.position.y, 10);
		this.graphics.endFill();
	}

	load(parent: any): void {
		this.graphics = new Graphics();
		this.container = new Container();
		this.location = new Static();
		this.container.addChild(this.graphics);
		parent.addChild(this.container);
	}

	unload(parent: any): void {
		parent.removeChild(this.container);
		this.container.removeChild(this.graphics);
	}

	update(gameTime: IAppTime): void {
		this.draw();

		if (this.targetPosition !== undefined) {
			this.location.position = this.targetPosition;
		}

		this.container.x = this.location.position.x;
		this.container.y = this.location.position.y;
		this.container.rotation = this.location.orientation;
	}
}
