import { Container } from 'pixi.js';
import MenuItem from './menu-item';
import { MenuConfig } from './menu.config';
import Vector2D from '../mathematics/vector';
import { Observable, merge, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IAppTime } from '../app';

export default class Menu {

    public select$: Observable<MenuItem>;

    private items: Array<MenuItem> = [];
    private unload$: Subject<Boolean>;

    constructor(
        private config: MenuConfig,
        private height: number,
        private width: number,
    ) { }

    load(container: Container) {
        const itemsGap = 10;
        const itemWidth = 400;
        let itemHeight = 100;

        const menuHeight = this.config.items.length * (itemHeight + itemsGap);
        const menuY = this.height / 2 - menuHeight;

        for (let i = 0; i < this.config.items.length; i++) {
            const item = new MenuItem(
                itemHeight,
                itemWidth,
                new Vector2D(this.width / 2 - itemWidth / 2, menuY + (itemHeight + itemsGap) * i),
                itemHeight / 2,
                this.config.items[i],
            );

            item.load(container);
            this.items.push(item);
        }

        this.unload$ = new Subject<Boolean>();
        this.select$ = merge(...this.items.map(item => item.select$))
            .pipe(takeUntil(this.unload$));
    }

    unload(container: Container) {
        this.unload$.next(true);
        this.unload$.complete();
        this.items.forEach(item => item.unload(container));
    }

    update(gameTime: IAppTime) {
    }
}