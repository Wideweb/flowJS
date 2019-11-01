import Task from './task';
import Scope from '../scope';

export default class SelectorTask extends Task {
	run(scope: Scope): boolean {
		for (let i = 0; i < this.children.length; i++) {
			if (this.children[i].run(scope)) {
				return true;
			}
		}

		return false;
	}
}