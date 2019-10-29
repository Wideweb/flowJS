import MapCell, { MapCellType } from './map-cell';
import { Container } from 'pixi.js';

export default class GameMap {

    public cells: MapCell[][];

    constructor(
        private data: number[][],
        private width: number,
        private height: number,
    ) { }

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