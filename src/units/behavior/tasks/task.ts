import Blackboard from '../blackboard';

export default abstract class Task {

	constructor(protected children: Task[]) { }

	abstract run(blackboard: Blackboard): boolean;
}