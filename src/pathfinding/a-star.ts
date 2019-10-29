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

class NodeRecord<T> implements IComparable {
	public node: T;
	public connection: any;
	public estimatedTotalCost: number;
	public cost: number = Infinity;

	public compareTo(node: NodeRecord<T>): number {
		return this.estimatedTotalCost - node.estimatedTotalCost;
	}
}

export interface IHeuristic<T> {
	estimate(from: T, to: T): number;
}

interface IComparable {
	compareTo(v: IComparable): number;
}

class PriorityQueue<T extends IComparable> {
	private list: T[] = [];

	contains(predicate: (node: T) => boolean): boolean {
		return this.list.some(predicate);
	}

	find(predicate: (node: T) => boolean) {
		return this.list.find(predicate);
	}

	length(): number {
		return this.list.length;
	}

	public enqueue(element: T) {
		this.list.push(element);
		this.up(this.list.length - 1);
	}

	public dequeue() {
		const element = this.list[0];
		this.swap(0, --this.list.length);
		this.down(0);
		return element;
	}

	private up(i: number): void {
		//Check whether the current element bigger than child
		while (i != 0 && this.list[i].compareTo(this.list[(i - 1) / 2]) > 0) {
			this.swap(i, (i - 1) / 2);
			i = (i - 1) / 2;
		}
	}

	private down(i: number): void {
		while (i < this.list.length / 2) {
			let maxI = 2 * i + 1;

			//Take the biggest child
			if (2 * i + 2 < this.list.length && this.list[2 * i + 2].compareTo(this.list[2 * i + 1]) > 0) {
				maxI = 2 * i + 2;
			}

			//Check whether the current element bigger than child
			if (this.list[i].compareTo(this.list[maxI]) >= 0) {
				return;
			}

			this.swap(i, maxI);
			i = maxI;
		}
	}

	private swap(fistIndex: number, secondIndex: number) {
		const firstElement = this.list[fistIndex];
		this.list[fistIndex] = this.list[secondIndex];
		this.list[secondIndex] = firstElement;
	}
}

export default class AStar<T> {

	getPath(graph: IGraph<T>, start: T, end: T, heuristic: IHeuristic<T>) {
		const startRecord = new NodeRecord<T>();
		startRecord.node = start;
		startRecord.connection = null;
		startRecord.cost = 0;
		startRecord.estimatedTotalCost = heuristic.estimate(start, end);

		const open = new PriorityQueue<NodeRecord<T>>();
		open.enqueue(startRecord);
		const closed: NodeRecord<T>[] = [];

		let current: NodeRecord<T>;

		while (open.length() > 0) {
			current = open.dequeue();
			if (current.node == end) {
				break;
			}

			const connections = graph.getConnections(current.node)
			for (let connection of connections) {
				const endNode = connection.to;
				const endNodeCost = current.cost + connection.cost;

				if (closed.some(record => record.node === endNode)) {
					continue;
				}

				let endNodeRecord = open.find(record => record.node === endNode);
				const isInOpen = !!endNodeRecord;

				if (!endNodeRecord) {
					endNodeRecord = new NodeRecord();
					endNodeRecord.node = endNode;
				} else if (endNodeRecord.cost <= endNodeCost) {
					continue;
				}

				endNodeRecord.cost = endNodeCost;
				endNodeRecord.connection = connection;
				endNodeRecord.estimatedTotalCost = endNodeCost + heuristic.estimate(start, endNodeRecord.node);

				if (!isInOpen) {
					open.enqueue(endNodeRecord);
				}
			}

			open.dequeue();
			closed.splice(closed.indexOf(current), 1);
		}

		if (current.node != end) {
			return [];
		}

		const path: GraphConnection<T>[] = [];

		while (current.node != start) {
			path.push(current.connection);
			current = current.connection.getFromNode();
		}

		return path.reverse();
	}
}