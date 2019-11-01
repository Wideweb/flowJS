import Task from './task';
import Scope from '../scope';

export default class SecuenceTask extends Task {
	run(scope: Scope): boolean {
		for (let i = 0; i < this.children.length; i++) {
			if (!this.children[i].run(scope)) {
				return false;
			}
		}

		return false;
	}
}