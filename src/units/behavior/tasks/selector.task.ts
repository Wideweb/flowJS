import Task from './task';
import Blackboard from '../blackboard';

export default class SelectorTask extends Task {
	run(blackboard: Blackboard): boolean {
		for (let i = 0; i < this.children.length; i++) {
			if (this.children[i].run(blackboard)) {
				return true;
			}
		}

		return false;
	}
}