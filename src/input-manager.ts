import { Observable } from 'rxjs';
import App from './app';
import Vector2D from './mathematics/vector';

export const POINTER_DOWN_EVENT = 'pointerdown';
export const POINTER_MOVE_EVENT = 'pointermove';

export class InputEvent {
	constructor(public type: string, public payload: Vector2D) { }
}

export default class InputManager {

	public on$: Observable<InputEvent>;

	private innerPointer: Vector2D;
	private static _instance: InputManager;

	constructor() {
		this.innerPointer = new Vector2D();

		this.on$ = new Observable<InputEvent>(observer => {
			this.addEvent(POINTER_DOWN_EVENT, observer);
			this.addEvent(POINTER_MOVE_EVENT, observer);
		});

		this.on$ = new Observable<InputEvent>();
	}

	private addEvent(evntType, observer) {
		App.instance.stage.on(evntType, (event) => {
			this.innerPointer.x = event.data.global.x;
			this.innerPointer.y = event.data.global.y;

			observer.next(new InputEvent(
				evntType,
				this.pointer,
			));
		});
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