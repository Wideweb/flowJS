import TaskDecorator from './task-decorator';
import Blackboard from '../blackboard';

export default class UntilFailTaskDecorator extends TaskDecorator {
	run(blackboard: Blackboard): boolean {
		while (this.child.run(blackboard)) { }
		return true;
	}
}