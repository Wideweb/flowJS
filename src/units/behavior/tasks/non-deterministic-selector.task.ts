import Task from './task';
import Blackboard from '../blackboard';

export default class NonDeterministicSelectorTask extends Task {
	run(blackboard: Blackboard): boolean {
		const shuffled = this.shuffle(this.children); 
		for (let i = 0; i < shuffled.length; i++) {
			if (!shuffled[i].run(blackboard)) {
				return false;
			}
		}

		return false;
	}

	shuffle(original: any[]) {
		const list = [...original];
		let n = list.length;
		while (n > 1) {
			let k = Math.round(Math.random() * n);
			n--;
			const element = list[n];
			list[n] = list[k];
			list[k] = element;
		}
		return list
	}
}