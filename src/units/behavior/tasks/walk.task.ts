import Task from './task';
import Blackboard from '../blackboard';
import Arrive from '../../movement/arrive';
import Character from '../../character';
import GameObject from '../../../game-object';

export default class WalkTask extends Task {

	run(blackboard: Blackboard): boolean {
		const character = blackboard.get<Character>('character');
		const target: GameObject = blackboard.get<GameObject>('target');
		const movement = new Arrive(character);

		const steering = movement.getSteering(target);

		if (steering !== null) {
            character.move(steering.linear);
            return false;
        } else {
            character.stop();
            return true;
        }
	}
}