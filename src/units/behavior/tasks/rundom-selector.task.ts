import Task from './task';
import Scope from '../scope';

export default class RundomSelectorTask extends Task {
	run(scope: Scope): boolean {
		while (true) {
			const index = Math.round(Math.random() * (this.children.length - 1));
			if (this.children[index].run(scope)) {
				return true;
			}
		}
	}
}