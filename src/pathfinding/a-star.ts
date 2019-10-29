class GraphNode {
}

class GraphConnection {
    getToNode(): GraphNode {
        return new GraphNode();
    }

    getCost(): number {
        return 1;
    }
}

class Graph {
    getConnections(node: GraphNode): GraphConnection[] {
        return [];
    }
}


class NodeRecord implements IComparable {
    public node: GraphNode;
    public connection: any;
    public estimatedTotalCost: number;
    public cost: number = Infinity;

    public compareTo(node: NodeRecord): number {
        return this.estimatedTotalCost - node.estimatedTotalCost;
    }
}

interface IHeuristic {
    estimate(from: GraphNode, to: GraphNode): number;
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