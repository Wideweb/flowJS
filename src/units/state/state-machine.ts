import Character from '../character';
import { NotCondition } from './conditions/not.condition';
import HasVelocityCondition from './conditions/has-velocity.condition';

export class State {
	constructor(
		public action: Action,
		public transitions: Transition[],
	) { }
}

export interface ICondition {
	test(character: Character): Boolean;
}

export class Action {
	constructor(
		public type: string,
		public payload?: any,
	) { }
}

export class Transition {
	constructor(
		private actions: Action[],
		private targetState: State,
		private condition: ICondition,
	) { }

	isTriggered(context: any): Boolean {
		return this.condition.test(context);
	}

	getTargetState(): State {
		return this.targetState;
	}

	getAction(): Action[] {
		return this.actions;
	}
}

export default class StateMachine {
	private states: State[] = [];
	private currentState: State;

	constructor(
		private character: Character,
	) {
		const stop = new State(new Action('STOP'), []);
		const move = new State(new Action('MOVE'), []);

		stop.transitions.push(
			new Transition(
				[
					new Action('READY'),
					new Action('STEADY'),
				],
				move,
				new HasVelocityCondition(),
			)
		);

		move.transitions.push(
			new Transition(
				[
					new Action('SLOW_DOWN'),
				],
				stop,
				new NotCondition(new HasVelocityCondition()),
			)
		);

		this.states.push(
			stop,
			move,
		);

		this.currentState = stop;
	}

	update(): Action[] {
		let triggeredTransition: Transition;

		for (let transition of this.currentState.transitions) {
			if (transition.isTriggered(this.character)) {
				triggeredTransition = transition;
				break;
			}
		}

		if (triggeredTransition) {
			this.currentState = triggeredTransition.getTargetState();
			return triggeredTransition.getAction();
		}

		return [this.currentState.action];
	}
}
