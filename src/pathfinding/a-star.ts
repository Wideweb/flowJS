import { Graph, GraphNode, GraphConnection } from './graph';
import IComparable from '../system/comparable';
import IHeuristic from './heuristic';
import PriorityQueue from '../system/collections/priority-queue';

class NodeRecord implements IComparable {
    public node: GraphNode;
    public connection: any;
    public estimatedTotalCost: number;
    public cost: number = Infinity;

    public compareTo(node: NodeRecord): number {
        return this.estimatedTotalCost - node.estimatedTotalCost;
    }
}

export default class AStar {

    getPath(graph: Graph, start: GraphNode, end: GraphNode, heuristic: IHeuristic) {
        const startRecord = new NodeRecord();
        startRecord.node = start;
        startRecord.connection = null;
        startRecord.cost = 0;
        startRecord.estimatedTotalCost = heuristic.estimate(start, end);

        const open = new PriorityQueue<NodeRecord>();
        open.enqueue(startRecord);
        const closed: NodeRecord[] = [];

        let current: NodeRecord;

        while (open.length() > 0) {
            current = open.dequeue();
            if (current.node == end) {
                break;
            }

            const connections = graph.getConnections(current)
            for (let connection of connections) {
                const endNode = connection.getToNode();
                const endNodeCost = current.cost + connection.getCost();

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

        const path: GraphConnection[] = [];

        while (current.node != start) {
            path.push(current.connection);
            current = current.connection.getFromNode();
        }

        return path.reverse();
    }
}