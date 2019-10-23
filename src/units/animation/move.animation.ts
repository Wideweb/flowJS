import Animation from './animation';
import { Rectangle, Sprite } from 'pixi.js';
import App from '../../app';
import { Orientation } from './orientation';

export default class MoveAnimation extends Animation {

    private frameSize: number = 64;

    load(parent: any): void {
        this.texture = App._instance.loader.resources['human'].texture;
        this.totalFrames = 8;
        this.texture.frame = this.getFrame();
        this.sprite = new Sprite(this.texture);
        this.sprite.anchor.set(0.5);
        this.sprite.scale.set(0.75);

        parent.addChild(this.sprite);
    }

    getOffset(): number {
        switch (this.orientation) {
            case Orientation.Up: return this.frameSize * 8;
            case Orientation.Down: return this.frameSize * 9;
            case Orientation.Left: return this.frameSize * 10;
            case Orientation.Right: return this.frameSize * 11;
        }
    }

    getFrame(): Rectangle {
        return new Rectangle(
            this.frameSize * this.frameNumber,
            this.getOffset(),
            this.frameSize,
            this.frameSize
        );
    }
}