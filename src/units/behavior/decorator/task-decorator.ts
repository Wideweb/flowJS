import Task from '../tasks/task';
import Blackboard from '../blackboard';

export default abstract class TaskDecorator {
	constructor(protected child: Task) { }

	abstract run(blackboard: Blackboard): boolean;
}