import TaskDecorator from './task-decorator';
import Blackboard from '../blackboard';

export default class BlackboardManagerTaskDecorator extends TaskDecorator {
	run(parent: Blackboard) {
		const blackboard = new Blackboard({}, parent);
		const result = this.child.run(blackboard);
		return result
	}
}