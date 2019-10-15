import Menu from './menu';
import { MENUS, MenuLinkType, MenuConfig } from './menu.config';
import ScreenManager from '../screen-manager';
import { Container } from 'pixi.js';
import { IAppTime } from '../app';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import MenuItem from './menu-item';

export default class MenuManager {

	public menu: Menu;
	private container: Container;
	private unload$: Subject<Boolean>;

	constructor(
		private menuId: string,
		private height: number,
		private width: number,
		private screenManager: ScreenManager) { }

	goTo(menuId: string): void {
		this.menu.unload(this.container);
		this.menuId = menuId;
		this.menu = new Menu(MENUS.get(this.menuId) as MenuConfig, this.height, this.width);
		this.menu.load(this.container);
	}

	load(container: Container): void {
		this.menu = new Menu(MENUS.get(this.menuId) as MenuConfig, this.height, this.width);
		this.menu.load(container);

		this.unload$ = new Subject<Boolean>();
		this.menu.select$
			.pipe(
				takeUntil(this.unload$)
			)
			.subscribe(item => this.onMenuItemSelected(item));

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

	private onMenuItemSelected(item: MenuItem): void {
		if (item.type === MenuLinkType.Screen) {
			this.screenManager.goTo(item.link, item.data);
		}
	}
}