import { filter } from 'rxjs/operators';
import { Subscription } from "rxjs/internal/Subscription";
import BasePlayerController from './base-player-controller';
import InputManager, { POINTER_DOWN_EVENT } from '../input-manager';
import { IAppTime } from '../app';
import Vector2D from '../mathematics/vector';

export default class UserPlayerController extends BasePlayerController {

	private pointerSubscription: Subscription;

	load(): void {
		this.pointerSubscription = InputManager.instance.on$
			.pipe(
				filter(e => e.type === POINTER_DOWN_EVENT)
			)
			.subscribe(e => {
				this.player.setTarget(new Vector2D(e.payload.x, e.payload.y));
			});
	}

	unload(): void {
		this.pointerSubscription.unsubscribe();
	}

	update(gameTime: IAppTime): void { }
}