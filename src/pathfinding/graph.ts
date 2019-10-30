export class GraphNode { }

export class GraphConnection {
    getToNode(): GraphNode {
        return new GraphNode();
    }

    getCost(): number {
        return 1;
    }
}

export class Graph {
    getConnections(node: GraphNode): GraphConnection[] {
        return [];
    }
}
