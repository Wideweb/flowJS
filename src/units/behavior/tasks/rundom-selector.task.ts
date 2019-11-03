import Task from './task';
import Blackboard from '../blackboard';

export default class RundomSelectorTask extends Task {
	run(blackboard: Blackboard): boolean {
		while (true) {
			const index = Math.round(Math.random() * (this.children.length - 1));
			if (this.children[index].run(blackboard)) {
				return true;
			}
		}
	}
}