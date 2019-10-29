import MapCell, { MapCellType } from './map-cell';
import { Container } from 'pixi.js';
import AStar, { IGraph, GraphConnection, IHeuristic } from '../pathfinding/a-star';

class Heuristic implements IHeuristic<MapCell> {
	estimate(from: MapCell, to: MapCell): number {
		return (Math.abs(from.x - to.x) + Math.abs(from.y - to.y)) * 10;
	}
}

export default class GameMap implements IGraph<MapCell> {

	public cells: MapCell[][];

	private dx: number[] = [0, 1, -1];
	private dy: number[] = [0, 1, -1];
	private pathFinder = new AStar<MapCell>();


	constructor(
		private data: number[][],
		private width: number,
		private height: number,
	) { }

	getPath(from: MapCell, to: MapCell) {
		return this.pathFinder.getPath(this, from, to, new Heuristic());
	}

	getConnections(node: MapCell): GraphConnection<MapCell>[] {
		const connections: GraphConnection<MapCell>[] = [];
		for (let i = 0; i < this.dy.length; i++) {
			for (let j = 0; j < this.dx.length; j++) {
				const x = node.x + this.dx[i];
				const y = node.y + this.dy[i];
				const cost = this.dx[i] !== 0 && this.dy[i] !== 0 ? 14 : 10;
				if (x >= 0 && y >= 0 && x < this.data[0].length && y < this.data.length) {
					connections.push(new GraphConnection(node, this.cells[y][x], cost));
				}
			}
		}
		return connections;
	}

	load(parent: Container): void {
		const cellWidth = this.width / this.data[0].length;
		const cellHeight = this.height / this.data.length;
		this.cells = [];
		for (let y = 0; y < this.data.length; y++) {
			this.cells.push([]);
			for (let x = 0; x < this.data[0].length; x++) {
				const cell = new MapCell(
					x * cellWidth,
					y * cellHeight,
					this.data[y][x] as MapCellType,
					cellWidth,
					cellHeight,
				);
				cell.load(parent);
				this.cells[y].push(cell);
			}
		}
	}

	unload(parent: Container): void {
		this.cells.forEach(row => row.forEach(cell => cell.unload(parent)));
		this.cells.length = 0;
	}

	update(): void {
		this.cells.forEach(row => row.forEach(cell => cell.update()));
	}
}