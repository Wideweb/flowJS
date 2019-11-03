import TaskDecorator from './task-decorator';
import Task from '../tasks/task';
import Blackboard from '../blackboard';

export default class UntilFailTaskDecorator extends TaskDecorator {

	private runSoFar: number = 0;

	constructor(
		private limit: number,
		child: Task,
	) {
		super(child);
	}

	run(blackboard: Blackboard) {
		if (this.runSoFar >= this.limit) {
			return false;
		}

		this.runSoFar++;
		return this.child.run(blackboard);
	}
}