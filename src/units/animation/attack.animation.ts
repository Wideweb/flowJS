import Animation from './animation';
import { Rectangle, Sprite } from 'pixi.js';
import App from '../../app';
import { Orientation } from './orientation';

export default class AttackAnimation extends Animation {

    private frameSize: number = 192;

    load(parent: any): void {
        this.texture = App._instance.loader.resources['human'].texture;
        this.totalFrames = 5;
        this.texture.frame = this.getFrame();
        this.sprite = new Sprite(this.texture);
        this.sprite.anchor.set(0.5);
        this.sprite.scale.set(0.75);

        parent.addChild(this.sprite);
    }

    getOffset(): number {
        const baseOffset = 1344;
        switch (this.orientation) {
            case Orientation.Up: return this.frameSize * 0 + baseOffset;
            case Orientation.Left: return this.frameSize * 1 + baseOffset;
            case Orientation.Down: return this.frameSize * 2 + baseOffset;
            case Orientation.Right: return this.frameSize * 3 + baseOffset;
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