import TaskDecorator from './task-decorator';
import Scope from '../scope';

export default class UntilFailTaskDecorator extends TaskDecorator {
	run(scope: Scope): boolean {
		while (this.child.run(scope)) { }
		return true;
	}
}