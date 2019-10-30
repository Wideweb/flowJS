export class GraphConnection<T> {

	constructor(
		public from: T,
		public to: T,
		public cost: number,
	) { }
}

export interface IGraph<T> {
	getConnections(node: T): GraphConnection<T>[];
}
