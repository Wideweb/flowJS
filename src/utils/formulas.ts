export default class Formulas {
    static getRandomArbitraryInt(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    static getRandomArbitrary(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }
}