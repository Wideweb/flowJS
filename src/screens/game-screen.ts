import { Container } from 'pixi.js';
import { IAppTime } from '../app';
import BaseScreen from './base-screen';
import Player from '../player/player';
import UserPlayerController from '../player-controllers/user-player-controller';
import BasePlayerController from '../player-controllers/base-player-controller';

export default class GameScreen extends BaseScreen {

	private players: Array<Player> = [];
	private controllers: Array<BasePlayerController> = [];

	load(parent: any): void {
        this.container = new Container();
        
        this.container.x = 0;
        this.container.y = 0;

		const userPlayer = new Player();
		userPlayer.load(this.container);
		const userPlayerController = new UserPlayerController(userPlayer, this);
		userPlayerController.load();
		this.players.push(userPlayer);
		this.controllers.push(userPlayerController);

		parent.addChild(this.container);
	}

	unload(parent: any) {
		parent.removeChild(this.container);

		this.controllers.forEach(ctrl => ctrl.unload());
		this.controllers.length = 0;

		this.players.forEach(player => player.unload(this.container));
		this.players.length = 0;
	}

	update(gameTime: IAppTime) {
		this.players.forEach(player => player.update(gameTime));
		this.controllers.forEach(ctrl => ctrl.update(gameTime));
	}
}