import Character from '../character';
import { NotCondition } from './conditions/not.condition';
import HasVelocityCondition from './conditions/has-velocity.condition';
import { IAppTime } from '../../app';

export enum ActionType {
    Stop = 1,
    Move,
    Ready,
    Steady,
    SlowDown,
}

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
		public type: ActionType,
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
	private duration: number = 2000;
	private elapsed: number = this.duration;

	constructor(
		private character: Character,
	) {
		const stop = new State(new Action(ActionType.Stop), []);
		const move = new State(new Action(ActionType.Move), []);

		stop.transitions.push(
			new Transition(
				[
					new Action(ActionType.Ready),
					new Action(ActionType.Steady),
				],
				move,
				new HasVelocityCondition(),
			)
		);

		move.transitions.push(
			new Transition(
				[
					new Action(ActionType.SlowDown),
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

	update(gameTime: IAppTime): Action[] {
		this.elapsed += gameTime.elapsed;
        if (this.elapsed < this.duration) {
            return [this.currentState.action];
        }
		this.elapsed = 0;

		let triggeredTransition: Transition;

		for (let transition of this.currentState.transitions) {
			if (transition.isTriggered(this.character)) {
				triggeredTransition = transition;
				break;
			}
		}

		if (triggeredTransition) {
			this.currentState = triggeredTransition.getTargetState();
			//return triggeredTransition.getAction();
		}

		return [this.currentState.action];
	}
}
