import GameObject from '../../game-object';
import SteeringOutput from './steering-output';

export default interface ISteereing {
	getSteering(target: GameObject): SteeringOutput;
}
