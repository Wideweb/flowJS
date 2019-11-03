import Task from './task';
import Blackboard from '../blackboard';
import Arrive from '../../movement/arrive';

export default class WalkTask extends Task {

	run(blackboard: Blackboard): boolean {
		const character = blackboard.get('character');
		const target = blackboard.get('target');
		const movement = new Arrive(character);

		const steering = movement.getSteering(target);

		if (steering !== null) {
            this.character.velocity.x += steering.linear.x;
            this.velocity.y += steering.linear.y;

            this.location.position.x += this.velocity.x;
            this.location.position.y += this.velocity.y;
            this.location.orientation = this.velocity.angle();
        } else {
            this.velocity.x = 0;
            this.velocity.y = 0;
        }
	}
}