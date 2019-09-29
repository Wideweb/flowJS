import Static from "../mathematics/static";
import { IAppTime } from "../app";
import { Graphics, Container } from "pixi.js";

export default class Character {

	private graphics: Graphics;
	private container: Container;
	private location: Static;
	private targetLocation: Static;

	constructor() {
		this.graphics = new Graphics();
		this.container = new Container();
		this.location = new Static();
		
		this.container.addChild(this.graphics);
	}

	setTarget(location: Static) {
		this.targetLocation = location;
	}

	draw() {
        this.graphics.clear();
        this.graphics.lineStyle(0);
        this.graphics.beginFill(0xDE3249, 1);
        this.graphics.drawCircle(0, 0, 10);
        this.graphics.endFill();
    }

	load(container: any): void {
        container.addChild(this.container);
	}

	unload(container: any): void {
		container.removeChild(this.container);
	}

	update(gameTime: IAppTime): void {
		this.location = this.targetLocation;

		this.container.x = this.location.position.x;
		this.container.y = this.location.position.y;
		this.container.rotation = this.location.orientation;
	}
}
