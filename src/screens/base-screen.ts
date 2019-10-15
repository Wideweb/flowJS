import ScreenManager from "../screen-manager";
import InputManager from "../input-manager";
import { IAppTime } from "../app";
import { Container } from 'pixi.js';
import Menu from '../menu/menu';

export default abstract class BaseScreen {

    public menu: Menu;
    
	protected container: Container;

	constructor(
		public height: number,
		public width: number,
		protected screenManager: ScreenManager,
		protected inputManager: InputManager,
	) { }

	abstract load(parent: any): void;
	abstract unload(parent: any): void;
	abstract update(gameTime: IAppTime): void;
}