import IComparable from '../system/comparable';
import IHeuristic from './heuristic';
import { IGraph } from './graph';
import PriorityQueue from '../system/collections/priority-queue';
import Guid from '../system/guid';

class NodeRecord<T> implements IComparable {
    public id = Guid.uuidv4();
	public node: T;
	public parent: NodeRecord<T>;
	public estimatedTotalCost: number;
	public cost: number = Infinity;

	public compareTo(node: NodeRecord<T>): number {
		return node.estimatedTotalCost - this.estimatedTotalCost;
	}
}

export default class AStar<T> {
	getPath(graph: IGraph<T>, start: T, end: T, heuristic: IHeuristic<T>): T[] {
		const startRecord = new NodeRecord<T>();
		startRecord.node = start;
		startRecord.parent = null;
		startRecord.cost = 0;
		startRecord.estimatedTotalCost = heuristic.estimate(start, end);

		const open = new PriorityQueue<NodeRecord<T>>();
		open.enqueue(startRecord);
		const closed = new Map<string, NodeRecord<T>>();
		let current: NodeRecord<T>;

		while (open.length() > 0) {
			current = open.dequeue();
			if (current.node === end) {
				break;
			}

			const connections = graph.getConnections(current.node)
			for (let connection of connections) {
				const endNode = connection.to;
				const endNodeCost = current.cost + connection.cost;

				if (closed.has(current.id)) {
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
				endNodeRecord.parent = current;
				endNodeRecord.estimatedTotalCost = endNodeCost + heuristic.estimate(endNode, end);

				if (!isInOpen) {
					open.enqueue(endNodeRecord);
				}
			}

			closed.set(current.id, current);
		}

		if (current.node != end) {
			return [];
		}

		const path: T[] = [];

		while (current.node != start) {
			path.push(current.node);
			current = current.parent;
		}

		return path.reverse();
	}
}