import { GraphNode } from './graph';

export default interface IHeuristic {
    estimate(from: GraphNode, to: GraphNode): number;
}