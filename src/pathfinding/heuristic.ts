export default interface IHeuristic<T> {
    estimate(from: T, to: T): number;
}