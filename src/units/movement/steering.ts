import GameObject from '../../game-object';
import SteeringOutput from './steering-output';

export default interface ISteereing {
    readonly gameObject: GameObject;
	getSteering(target: GameObject): SteeringOutput;
}
