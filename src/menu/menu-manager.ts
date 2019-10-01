import Menu from './menu';
import { MENUS } from './menu.config';
import ScreenManager from '../screen-manager';
import { Container } from 'pixi.js';
import { IAppTime } from '../app';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export default class MenuManager {
    
    private menu: Menu;
    private container: Container;
    private unload$: Subject<Boolean>;
    
    constructor(
        private menuId: string, 
        private height: number, 
        private width: number, 
        private screenManager: ScreenManager) {
        this.menu = null;
        this.container = null;
    }

    goTo(menuId: string): void {
        this.menu.unload(this.container);
        this.menuId = menuId;
        this.menu = new Menu(MENUS[this.menuId], this.height, this.width);
        this.menu.load(this.container);
    }

    load(container: Container): void {
        this.menu = new Menu(MENUS[this.menuId], this.height, this.width);
        this.menu.load(container);

        this.unload$ = new Subject<Boolean>();
        this.menu.select$
            .pipe(
                takeUntil(this.unload$)
            )
            .subscribe(this._onMenuItemSelected.bind(this));

        this.container = container;
    }

    unload(container: Container): void {
        this.unload$.next(true);
        this.unload$.complete();
        this.menu.unload(container);
    }

    update(gameTime: IAppTime): void {
        this.menu.update(gameTime);
    }

    _onMenuItemSelected(type, link, data): void {
        if (type === 'screen') {
            this.screenManager.goTo(link, data);
        }
    }
}