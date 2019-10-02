import GameScreen from "../screens/game-screen";
import { IAppTime } from "../app";
import Player from "../player/player";

export default abstract class BasePlayerController {
	constructor(
		protected player: Player,
		protected gameScreen: GameScreen,
	) { }

	abstract load(): void;
	abstract unload(): void;
	abstract update(gameTime: IAppTime): void;
}