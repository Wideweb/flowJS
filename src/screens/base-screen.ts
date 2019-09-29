import ScreenManager from "../screen-manager";
import InputManager from "../input-manager";
import { IAppTime } from "../app";

export default abstract class BaseScreen {

	constructor(
		public height: number,
		public width: number,
		private screenManager: ScreenManager,
		private inputManager: InputManager,
	) { }

	abstract load(container: any): void;
	abstract unload(container: any): void;
	abstract update(gameTime: IAppTime): void;
}