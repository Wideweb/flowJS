import Task from './task';
import Scope from '../scope';

export default class NonDeterministicSelectorTask extends Task {
	run(scope: Scope): boolean {
		const shuffled = this.shuffle(this.children); 
		for (let i = 0; i < shuffled.length; i++) {
			if (!shuffled[i].run(scope)) {
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