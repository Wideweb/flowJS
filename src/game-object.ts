import Vector2D from './mathematics/vector';

export default class GameObject {
	constructor(
		public position: Vector2D = new Vector2D(),
	) { }
}