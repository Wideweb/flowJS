import Static from '../mathematics/static';
import { IAppTime } from '../app';
import { Graphics, Container } from 'pixi.js';
import Vector2D from '../mathematics/vector';
import Formulas from '../utils/formulas';
import Arrive from './movement/arrive';
import GameObject from '../game-object';

export default class Character {

	private graphics: Graphics;
	private container: Container;
	private location: Static;
	private movement: Arrive;
	private target: GameObject;
	private formationTarget: Vector2D;

	public velocity: Vector2D;

	get position() {
		return this.location.position;
	}

	setFormationTarget(target: Vector2D) {
		this.formationTarget = target;
	}

	setTarget(target: GameObject) {
		this.target = target;
	}

	draw() {
		this.graphics.clear();
		this.graphics.lineStyle(0);
		this.graphics.beginFill(0xDE3249, 1);
		this.graphics.drawCircle(0, 0, 10);
		this.graphics.endFill();
	}

	load(parent: any): void {
		this.graphics = new Graphics();
		this.container = new Container();
		this.location = new Static();
		this.velocity = new Vector2D(1, 1);
		this.movement = new Arrive(this);
		this.location.position.x = Formulas.getRandomArbitrary(-300, 300);
		this.location.position.y = Formulas.getRandomArbitrary(-300, 300);
		this.container.addChild(this.graphics);
		parent.addChild(this.container);
	}

	unload(parent: any): void {
		parent.removeChild(this.container);
		this.container.removeChild(this.graphics);
	}

	update(gameTime: IAppTime): void {
		this.draw();

		let point = this.formationTarget;
		if (this.target !== undefined) {
			point = this.target.position.sub(point);
		}

		const steering = this.movement.getSteering(new GameObject(point));

		if (steering !== null) {
			this.velocity.x += steering.linear.x;
			this.velocity.y += steering.linear.y;

			this.location.position.x += this.velocity.x;
			this.location.position.y += this.velocity.y;
		}

		this.container.x = this.location.position.x;
		this.container.y = this.location.position.y;
		this.container.rotation = this.location.orientation;
	}
}
