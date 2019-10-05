import ISteereing from './steering';
import GameObject from '../../game-object';

export default class PrioritySteering {

	private steerings: Array<ISteereing>;
	private epsilon: number;

	getSteering(target: GameObject) {
		for (let i = 0; i < this.steerings.length; i++) {
			const steering = this.steerings[i].getSteering(target);

			if (steering.linear.length() > this.epsilon) {
				return steering
			}
		}

		return null;
	}
}