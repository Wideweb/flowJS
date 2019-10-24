import Static from '../mathematics/static';
import { IAppTime } from '../app';
import { Container } from 'pixi.js';
import Vector2D from '../mathematics/vector';
import Formulas from '../utils/formulas';
import Arrive from './movement/arrive';
import GameObject from '../game-object';
import ISteereing from './movement/steering';
import StateMachine from './state/state-machine';
import AnimationManager from './animation/animation-manager';

export default class Character extends GameObject {

    protected container: Container;
    protected movement: ISteereing;
    protected state: StateMachine;
    protected animation: AnimationManager;

    public target: GameObject;

    constructor(
        protected resource: string,
    ) {
        super();
    }

    setTarget(target: GameObject) {
        this.target = target;
    }

    load(parent: any): void {
        this.container = new Container();
        this.location = new Static();
        this.velocity = new Vector2D();
        this.animation = new AnimationManager(this, this.resource);

        this.movement = new Arrive(this);
        this.state = new StateMachine(this);

        this.location.position.x = Formulas.getRandomArbitrary(150, 450);
        this.location.position.y = Formulas.getRandomArbitrary(150, 450);

        this.animation.load(this.container);

        parent.addChild(this.container);
    }

    unload(parent: any): void {
        parent.removeChild(this.container);
    }

    update(gameTime: IAppTime): void {
        const steering = this.movement.getSteering(this.target);

        if (steering !== null) {
            this.velocity.x += steering.linear.x;
            this.velocity.y += steering.linear.y;

            this.location.position.x += this.velocity.x;
            this.location.position.y += this.velocity.y;
            this.location.orientation = this.velocity.angle();
        } else {
            this.velocity.x = 0;
            this.velocity.y = 0;
        }

        this.container.x = this.location.position.x;
        this.container.y = this.location.position.y;

        const actions = this.state.update(gameTime);
        this.animation.setAnimation(actions[actions.length - 1].type);
        this.animation.update(gameTime);
    }
}
