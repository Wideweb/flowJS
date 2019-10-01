import { Observable, fromEvent, Subject } from 'rxjs';
import { Text, Graphics, Rectangle, Container } from 'pixi.js';
import Vector2D from '../mathematics/vector';
import { MenuItemConfig, MenuLinkType } from './menu.config';
import { IAppTime } from '../app';
import { share, map, takeUntil } from 'rxjs/operators';

export default class MenuItem {

    public text: string;
    public type: MenuLinkType;
    public link: string;
    public data: any;
    public select$: Observable<MenuItem>;

    private message: Text;
    private graphics: Graphics;
    private unload$: Subject<Boolean>;

    constructor(
        private height: number,
        private width: number,
        private position: Vector2D,
        private fontSize: number,
        config: MenuItemConfig,
    ) {

        this.text = config.text;
        this.type = config.type;
        this.link = config.link;
        this.data = config.data;
    }

    load(container: Container) {
        const message = new Text(this.text, { fontSize: this.fontSize, fill: 'white' });
        message.position.x = this.position.x + this.width / 2 - message.width / 2;
        message.position.y = this.position.y + this.height / 2 - this.fontSize / 2;
        this.message = message;

        const graphics = new Graphics();
        graphics.lineStyle(2, 0xFFFFFF, 1);
        graphics.drawRect(this.position.x, this.position.y, this.width, this.height);
        graphics.hitArea = new Rectangle(this.position.x, this.position.y, this.width, this.height);
        graphics.interactive = true;

        this.unload$ = new Subject<Boolean>();
        this.select$ = fromEvent(graphics, 'pointerdown')
            .pipe(
                map<any, MenuItem>(_ => this),
                share(),
                takeUntil(this.unload$)
            );

        this.graphics = graphics;

        container.addChild(this.message);
        container.addChild(this.graphics);
    }

    unload(container: Container) {
        this.unload$.next(true);
        this.unload$.complete();
        container.removeChild(this.message);
        container.removeChild(this.graphics);
    }

    update(gameTime: IAppTime) {
    }
}