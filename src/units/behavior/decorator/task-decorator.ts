import Task from '../tasks/task';
import Scope from '../scope';

export default abstract class TaskDecorator {
	constructor(protected child: Task) { }

	abstract run(scope: Scope): boolean;
}