import Scope from '../scope';

export default abstract class Task {

	constructor(protected children: Task[]) { }

	abstract run(scope: Scope): boolean;
}