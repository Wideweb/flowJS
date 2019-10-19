import Character from '../../character';
import { ICondition } from '../state-machine';

export class NotCondition {
	constructor(
		private condition: ICondition
	) { }

	test(character: Character): Boolean {
		return !this.condition.test(character);
	}
}
