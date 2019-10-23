import MoveAnimation from './move.animation';

export default class StopAnimation extends MoveAnimation {

    load(parent: any): void {
        super.load(parent);
        this.totalFrames = 1;
    }
}