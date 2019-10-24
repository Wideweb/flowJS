import { Container } from 'pixi.js';
import Animation from './animation';
import { ActionType } from '../state/state-machine';
import MoveAnimation from './move.animation';
import { IAppTime } from '../../app';
import StopAnimation from './stop.animation';
import AttackAnimation from './attack.animation';
import Character from '../character';
import { Orientation } from './orientation';

export default class AnimationManager {

	private animationMap: Map<ActionType, Animation>;
	private animation: Animation;
	private nextAction: ActionType;
	private duration: number = 0;
	private elapsed: number = this.duration;

	constructor(private character: Character) { }

	setAnimation(actionType: ActionType): void {
		this.nextAction = actionType;
	}

	load(container: Container): void {
		const move = new MoveAnimation();
		move.load(container);

		const stop = new StopAnimation();
		stop.load(container);

		const attack = new AttackAnimation();
		attack.load(container);

		this.animationMap = new Map<ActionType, Animation>();
		this.animationMap.set(ActionType.Move, move);
		this.animationMap.set(ActionType.Stop, attack);
		this.animationMap.set(ActionType.Ready, move);
		this.animationMap.set(ActionType.Steady, move);
		this.animationMap.set(ActionType.SlowDown, move);
	}

	unload(container: Container): void {
		this.animationMap.forEach(animation => animation.unload(container));
	}

	update(gameTime: IAppTime): void {
		this.elapsed += gameTime.elapsed;
		if (this.elapsed >= this.duration) {

			if (this.nextAction !== null) {
				const newAnimation = this.animationMap.get(this.nextAction);
				if (newAnimation !== this.animation) {
					this.animation = newAnimation;
					this.animation.reset();
				}
			}

			let angle = this.character.location.orientation;
			if (angle < 0) {
				angle += Math.PI * 2;
			}
			let orientation = Orientation.Up;

			if (angle >= Math.PI * 1 / 4 && angle < Math.PI * 3 / 4) {
				orientation = Orientation.Down;
			}
			else if (angle >= Math.PI * 3 / 4 && angle < Math.PI * 5 / 4) {
				orientation = Orientation.Left;
			}
			else if (angle >= Math.PI * 5 / 4 && angle < Math.PI * 7 / 4) {
				orientation = Orientation.Up;
			}
			else if (angle >= Math.PI * 7 / 4 || angle < Math.PI * 1 / 4) {
				orientation = Orientation.Right;
			}

			this.animation.setOrientation(orientation);

			this.nextAction = null;
			this.elapsed = 0;
		}

		this.animation.update(gameTime);
	}
}