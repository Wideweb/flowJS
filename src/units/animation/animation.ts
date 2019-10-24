import { Rectangle, Sprite, Texture } from 'pixi.js';
import { IAppTime } from '../../app';
import { Orientation } from './orientation';

export default abstract class Animation {
    protected sprite: Sprite;
    protected texture: Texture;
    protected totalFrames: number = 0;
    protected frameElapsed: number = 0;
    protected frameDuratiom: number = 50;
    protected frameNumber: number = 0;
    protected orientation: Orientation = Orientation.Up;

    constructor(protected resource: string) { }

    abstract load(parent: any): void;
    abstract getFrame(): Rectangle;

    unload(parent: any): void {
        parent.removeChild(this.sprite);
    }

    update(gameTime: IAppTime) {
        this.frameElapsed += gameTime.elapsed;
        if (this.frameElapsed >= this.frameDuratiom) {
            this.nextFrame();
            this.frameElapsed = 0;
        }
    }

    private nextFrame() {
        this.frameNumber++;
        if (this.frameNumber >= this.totalFrames) {
            this.frameNumber = 0;
        }

        this.texture.frame = this.getFrame();
    }

    reset() {
        this.frameNumber = 0;
        this.frameElapsed = 0;
    }

    setOrientation(orientation: Orientation) {
        this.orientation = orientation;
    }
}
