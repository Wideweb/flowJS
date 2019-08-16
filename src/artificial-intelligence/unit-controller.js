import Formulas from '../utils/formulas';

export default class UnitController {
    constructor(unit, mapWidth, mapHeight, gameScreen) {
        this.unit = unit;
        this.mapWidth = mapWidth;
        this.mapHeight = mapHeight;
        this.gameScreen = gameScreen;

        this.changeDirectionTime = 5000 + Math.random() * 5000;
        this.changeDirectionTimeElapsed = this.changeDirectionTime;

        this.unit.onAttacked = () => this.unit.speed = this.unit.initSpeed * 2;
    }

    update(gameTime) {
        this.changeDirectionTimeElapsed += gameTime.elapsed;

        if (this.changeDirectionTimeElapsed >= this.changeDirectionTime) {
            this.changeDirectionTimeElapsed = 0;

            const units = [this.gameScreen.player, ...this.gameScreen.enemies, ...this.gameScreen.food];
            const target = units[Formulas.getRandomArbitraryInt(0, units.length - 1)];

            this.unit.target = target;
        }
    }
}