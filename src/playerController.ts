import Player from "./player";
import InputManager, { POINTER_DOWN_EVENT } from "./input-manager";
import { filter } from 'rxjs/operators';
import { Subscription } from "rxjs/internal/Subscription";
import { IAppTime } from "./app";
import DevScreen from "./screens/dev-screen";


export abstract class PlayerController {
	constructor(
		private player: Player,
		private gameScreen: DevScreen,
	) { }

	abstract load(): void;
	abstract unload(): void;
	abstract update(gameTime: IAppTime): void;
}

export class AIPlayerController extends PlayerController {

	load(): void { }

	unload(): void { }

	update(gameTime: IAppTime): void { }
}

export class UserPlayerController extends PlayerController {

	private pointerSubscription: Subscription;

	load(): void {
		this.pointerSubscription = InputManager.instance.on$
			.pipe(
				filter(e => e.type === POINTER_DOWN_EVENT)
			)
			.subscribe(e => {
				this.player.
				e.payload.x;
				e.payload.y;
			});
	}

	unload(): void {
		this.pointerSubscription.unsubscribe();
	}

	update(gameTime: IAppTime): void { }
}