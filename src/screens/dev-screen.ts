import { IAppTime } from '../app';
import BaseScreen from './base-screen';
import Player from '../player';
import { PlayerController, UserPlayerController } from '../playerController';

export default class DevScreen extends BaseScreen {

	private players: Array<Player> = [];
	private controllers: Array<PlayerController> = [];

	constructor(height, width, screenManager, inputManager) {
		super(
			height,
			width,
			screenManager,
			inputManager,
		);
	}

	load(container: any): void {
		const userPlayer = new Player();
		userPlayer.load(container);
		const userPlayerController = new UserPlayerController(userPlayer, this);
		userPlayerController.load();
		this.players.push(userPlayer);
		this.controllers.push(userPlayerController);
	}

	unload(container: any) {
		this.controllers.forEach(ctrl => ctrl.unload());
		this.controllers.length = 0;

		this.players.forEach(player => player.unload(container));
		this.players.length = 0;
	}

	update(gameTime: IAppTime) {
		this.players.forEach(player => player.update(gameTime));
		this.controllers.forEach(ctrl => ctrl.update(gameTime));
	}
}