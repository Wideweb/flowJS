import IComparable from '../system/comparable';
import IHeuristic from './heuristic';
import { IGraph, GraphConnection } from './graph';
import PriorityQueue from '../system/collections/priority-queue';

class NodeRecord<T> implements IComparable {
	public node: T;
	public connection: any;
	public estimatedTotalCost: number;
	public cost: number = Infinity;

	public compareTo(node: NodeRecord<T>): number {
		return this.estimatedTotalCost - node.estimatedTotalCost;
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