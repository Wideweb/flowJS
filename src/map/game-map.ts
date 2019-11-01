import MapCell, { MapCellType } from './map-cell';
import { Container } from 'pixi.js';
import { GraphConnection, IGraph } from '../pathfinding/graph';
import IHeuristic from '../pathfinding/heuristic';
import AStar from '../pathfinding/a-star';
import Vector2D from '../mathematics/vector';

class Heuristic implements IHeuristic<MapCell> {
    estimate(from: MapCell, to: MapCell): number {
        return (Math.abs(from.x - to.x) + Math.abs(from.y - to.y)) * 10;
    }
}

export default class GameMap implements IGraph<MapCell> {

    public cells: MapCell[][];
    private pathFinder = new AStar<MapCell>();

    private path: MapCell[] = [];

    constructor(
        private data: number[][],
        private width: number,
        private height: number,
    ) { }

    getPath(from: MapCell, to: MapCell): MapCell[] {
        return this.pathFinder.getPath(this, from, to, new Heuristic());
    }

    getConnections(node: MapCell): GraphConnection<MapCell>[] {
        if (node.connections) {
            return node.connections;
        }

        const dx: number[] = [0, 0, 1, 1, 1, -1, -1, -1];
        const dy: number[] = [1, -1, 0, 1, -1, 0, 1, 1];
        const connections: GraphConnection<MapCell>[] = [];
        for (let i = 0; i < dy.length; i++) {
            const x = node.x + dx[i];
            const y = node.y + dy[i];
            const cost = dx[i] !== 0 && dy[i] !== 0 ? 14 : 10;
            if (x >= 0 && y >= 0 && x < this.data[0].length && y < this.data.length) {
                const cell = this.cells[y][x];
                if (cell.type === MapCellType.Empty) {
                    connections.push(new GraphConnection(node, this.cells[y][x], cost));
                }
            }
        }

        return node.connections = connections;
    }

    drawPath(path: MapCell[]) {
        this.path = path;
    }

    load(parent: Container): void {
        const cellWidth = this.width / this.data[0].length;
        const cellHeight = this.height / this.data.length;
        this.cells = [];
        for (let y = 0; y < this.data.length; y++) {
            this.cells.push([]);
            for (let x = 0; x < this.data[0].length; x++) {
                const cell = new MapCell(
                    x,
                    y,
                    this.data[y][x] as MapCellType,
                    new Vector2D(x * cellWidth, y * cellHeight),
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
        this.cells.forEach(row => row.forEach(cell => {
            cell.color = this.path.includes(cell) ? 0xFF0000 : 0x0B6623;
            cell.update();
        }));
    }
}