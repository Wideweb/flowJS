import { Observable, merge, fromEvent } from 'rxjs';
import App from './app';
import Vector2D from './mathematics/vector';
import { map } from 'rxjs/operators';

export const POINTER_DOWN_EVENT: string = 'pointerdown';
export const POINTER_MOVE_EVENT: string = 'pointermove';

export class InputEvent {
	constructor(public type: string, public payload: Vector2D) { }
}

export default class InputManager {

	public on$: Observable<InputEvent>;

	private innerPointer: Vector2D;
	private static _instance: InputManager;

	constructor() {
		this.innerPointer = new Vector2D();

		this.on$ = merge(
			fromEvent(App.instance.stage, POINTER_DOWN_EVENT),
			fromEvent(App.instance.stage, POINTER_MOVE_EVENT)
		).pipe(
			map((event: any) => {
				this.innerPointer.x = event.data.global.x;
				this.innerPointer.y = event.data.global.y;
				return new InputEvent(event.type, this.pointer);
			})
		);
	}

	static get instance() {
		if (!InputManager._instance) {
			InputManager._instance = new InputManager();
		}

		return InputManager._instance;
	}

	get pointer(): Vector2D {
		const x = this.innerPointer.x - App.instance.stage.x;
		const y = this.innerPointer.y - App.instance.stage.y;
		return new Vector2D(x, y);
	}
}