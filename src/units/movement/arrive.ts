import GameObject from '../../game-object';
import SteeringOutput from './steering-output';
import ISteereing from './steering';

export default class Arrive implements ISteereing {

    targetRadius: number = 2;
    slowRadius: number = 5;
    timeToTarget: number = 1;

    constructor(
        public readonly gameObject: GameObject
    ) { }

    getSteering(target: GameObject): SteeringOutput {
        if (!target) {
            return null;
        }

        const steering = new SteeringOutput()

        const direction = target.location.position.sub(this.gameObject.location.position);
        const distance = direction.length();

        if (distance < this.targetRadius) {
            return null;
        }

        let targetSpeed = this.gameObject.maxSpeed;
        if (distance < this.slowRadius) {
            targetSpeed = this.gameObject.maxSpeed * distance / this.slowRadius;
        }

        let targetVelocity = direction
            .normalize()
            .mul(targetSpeed);

        //Acceleration tries to get to the target velocity
        steering.linear = targetVelocity
            .sub(this.gameObject.velocity)
            .div(this.timeToTarget);

        if (steering.linear.length() > this.gameObject.maxAcceleration) {
            steering.linear = steering.linear
                .normalize()
                .mul(this.gameObject.maxAcceleration);
        }

        return steering;
    }
}
