import Static from '../mathematics/static';
import App, { IAppTime } from '../app';
import { Container, Sprite, Rectangle, Texture } from 'pixi.js';
import Vector2D from '../mathematics/vector';
import Formulas from '../utils/formulas';
import Arrive from './movement/arrive';
import GameObject from '../game-object';
import ISteereing from './movement/steering';
import StateMachine from './state/state-machine';

export default class Character extends GameObject {

	protected container: Container;
	protected movement: ISteereing;
	protected state: StateMachine;
	protected texture: Texture;
	protected sprite: Sprite;
	protected frames: Rectangle[];

	frameElapsed: number = 0;
	frameDuratiom: number = 40;
	frameNumber: number = 0;

	public target: GameObject;

	setTarget(target: GameObject) {
		this.target = target;
	}

	load(parent: any): void {
		this.container = new Container();
		this.location = new Static();
		this.velocity = new Vector2D(1, 1);

		this.movement = new Arrive(this);
		this.state = new StateMachine(this);

		this.location.position.x = Formulas.getRandomArbitrary(150, 450);
		this.location.position.y = Formulas.getRandomArbitrary(150, 450);

		this.texture = App._instance.loader.resources['fly'].texture;

		this.frames = [
			new Rectangle(0, 75 * 0, 75, 75),
			new Rectangle(0, 75 * 1, 75, 75),
		];

		this.texture.frame = this.frames[0];
		this.sprite = new Sprite(this.texture);
		this.sprite.anchor.set(0.5);
		this.sprite.rotation = 90 * Math.PI / 180;
		this.sprite.scale.set(0.75);
		this.container.addChild(this.sprite);

		parent.addChild(this.container);
	}

	unload(parent: any): void {
		parent.removeChild(this.container);
		this.container.removeChild(this.sprite);
	}

	update(gameTime: IAppTime): void {
		const steering = this.movement.getSteering(this.target);

		if (steering !== null) {
			this.velocity.x += steering.linear.x;
			this.velocity.y += steering.linear.y;

			this.location.position.x += this.velocity.x;
			this.location.position.y += this.velocity.y;
		} else {
			this.velocity.x = 0;
			this.velocity.y = 0;
		}

		this.container.x = this.location.position.x;
		this.container.y = this.location.position.y;
		this.container.rotation = Math.atan2(this.velocity.y, this.velocity.x);

		this.state.update();

		this.frameElapsed += gameTime.elapsed;
		if (this.frameElapsed >= this.frameDuratiom) {
			this.nextFrame();
			this.frameElapsed = 0;
		}
	}

	private nextFrame() {
		this.frameNumber++;
		if (this.frameNumber >= this.frames.length) {
			this.frameNumber = 0;
		}
		
		this.texture.frame = this.frames[this.frameNumber];
	}
}
