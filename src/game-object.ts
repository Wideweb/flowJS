import Vector2D from './mathematics/vector';
import Static from './mathematics/static';

export default class GameObject {
    constructor(
        public location: Static = new Static(),
        public velocity: Vector2D = new Vector2D(),
        public maxAcceleration: number = 0.4,
        public maxSpeed: number = 4,
    ) { }

    static createFromPoint(point: Vector2D): GameObject {
        const instance = new GameObject();
        instance.location.position = point;
        return instance;
    }
}