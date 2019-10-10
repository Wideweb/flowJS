import GameObject from '../../game-object';
import Character from '../character';
import SteeringOutput from './steering-output';
import ISteereing from './steering';

export default class Arrive implements ISteereing {

	target: GameObject;
	maxAcceleration: number = 0.1;
	maxSpeed: number = 1;
	targetRadius: number = 5;
	slowRadius: number = 10;
	timeToTarget: number = 0.1;

	constructor(
		protected character: Character
	) { }

	getSteering(target: GameObject) {
		if (!target) {
			return null;
		}

		const steering = new SteeringOutput()

		const direction = target.position.sub(this.character.position);
		const distance = direction.length();

		if (distance < this.targetRadius) {
			this.character.target = null;
			return null;
		}

		let targetSpeed = this.maxSpeed;
		if (distance < this.slowRadius) {
			targetSpeed = this.maxSpeed * distance / this.slowRadius;
		}

		let targetVelocity = direction
			.normalize()
			.mul(targetSpeed);

		//Acceleration tries to get to the target velocity
		steering.linear = targetVelocity
			.sub(this.character.velocity)
			.div(this.timeToTarget);

		if (steering.linear.length() > this.maxAcceleration) {
			steering.linear = steering.linear
				.normalize()
				.mul(this.maxAcceleration);
		}

		steering.angular = 0;
		return steering;
	}
}
