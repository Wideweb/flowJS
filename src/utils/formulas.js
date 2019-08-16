export default class Formulas {
    static getRandomArbitraryInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    static getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }
}