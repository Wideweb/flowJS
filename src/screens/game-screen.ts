import { Container } from 'pixi.js';
import { IAppTime } from '../app';
import BaseScreen from './base-screen';
import Player from '../player/player';
import UserPlayerController from '../player-controllers/user-player-controller';
import BasePlayerController from '../player-controllers/base-player-controller';
import MenuManager from '../menu/menu-manager';
import GameMap from '../map/game-map';
import gameMapConfig from '../map/map.config';

export default class GameScreen extends BaseScreen {

    private players: Array<Player> = [];
    private controllers: Array<BasePlayerController> = [];
    private menuManager: MenuManager;
    private map: GameMap;

    load(parent: any): void {
        this.container = new Container();

        this.container.x = 0;
        this.container.y = 0;

        parent.addChild(this.container);

        this.map = new GameMap(gameMapConfig, this.width, this.height);
        this.map.load(this.container);
        const path = this.map.getPath(this.map.cells[1][1], this.map.cells[6][9]);
        this.map.drawPath(path);

        this.menuManager = new MenuManager('game-bar', this.height, this.width, this.screenManager);
        this.menuManager.load(parent);
        this.menu = this.menuManager.menu;

        const userPlayer = new Player();
        userPlayer.load(this.container);
        const userPlayerController = new UserPlayerController(userPlayer, this);
        userPlayerController.load();
        this.players.push(userPlayer);
        this.controllers.push(userPlayerController);
    }

    unload(parent: any) {
        this.menuManager.unload(parent);
        parent.removeChild(this.container);

        this.controllers.forEach(ctrl => ctrl.unload());
        this.controllers.length = 0;

        this.players.forEach(player => player.unload(this.container));
        this.players.length = 0;

        this.map.unload(this.container);
    }

    update(gameTime: IAppTime) {
        this.map.update();
        this.menuManager.update(gameTime);
        this.players.forEach(player => player.update(gameTime));
        this.controllers.forEach(ctrl => ctrl.update(gameTime));
    }
}