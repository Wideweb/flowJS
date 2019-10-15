import { filter } from 'rxjs/operators';
import { Subscription } from "rxjs/internal/Subscription";
import BasePlayerController from './base-player-controller';
import InputManager, { POINTER_DOWN_EVENT } from '../input-manager';
import { IAppTime } from '../app';
import Vector2D from '../mathematics/vector';
import GameObject from '../game-object';
import MenuItem from '../menu/menu-item';
import CirclePattern from '../formations/patterns/circle-pattern';
import LinePattern from '../formations/patterns/line-pattern';
import NLinePattern from '../formations/patterns/n-line-pattern';

export default class UserPlayerController extends BasePlayerController {

    private pointerSubscription: Subscription;

    load(): void {
        this.pointerSubscription = InputManager.instance.on$
            .pipe(
                filter(e => e.type === POINTER_DOWN_EVENT)
            )
            .subscribe(e => {
                const point = GameObject.createFromPoint(new Vector2D(e.payload.x, e.payload.y));
                this.player.setTarget(point);
            });

        this.gameScreen.menu.select$
            .subscribe(item => this.onMenuItemSelected(item));
    }

    unload(): void {
        this.pointerSubscription.unsubscribe();
    }

    update(gameTime: IAppTime): void { }

    private onMenuItemSelected(item: MenuItem): void {
        if (item.text === 'circle') {
            this.player.settPattern(new CirclePattern());
        }

        if (item.text === 'line') {
            this.player.settPattern(new LinePattern());
        }

        if (item.text === 'n-line') {
            this.player.settPattern(new NLinePattern());
        }
    }
}