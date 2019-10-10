import GameObject from '../../game-object';
import SteeringOutput from './steering-output';
import Arrive from './arrive';

export default class Formation extends Arrive {
	getSteering(target: GameObject): SteeringOutput {
		if (!this.character.formationTarget) {
			return null;
		}
		return super.getSteering(new GameObject(this.character.formationTarget));
	}
}
