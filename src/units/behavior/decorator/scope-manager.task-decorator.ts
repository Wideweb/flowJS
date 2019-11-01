import TaskDecorator from './task-decorator';
import Scope from '../scope';

export default class ScopeManagerTaskDecorator extends TaskDecorator {
	run(parent: Scope) {
		const scope = new Scope({}, parent);
		const result = this.child.run(scope);
		return result
	}
}