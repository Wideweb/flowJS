import { Container } from 'pixi.js';
import Character from "../units/character";
import FormationManager from "../formations/formations-manager";
import { IAppTime } from "../app";
import CirclePattern from '../formations/patterns/circle-pattern';
import GameObject from '../game-object';

export default class Player {

    characters: Array<Character> = [];
    formationManager: FormationManager = new FormationManager();;

    setTarget(position: GameObject) {
        this.characters.forEach(character => character.setTarget(position));
    }

    load(parent: Container): void {
        this.formationManager.setPattern(new CirclePattern());
        for (let i = 0; i < 30; i++) {
            const character = new Character();
            character.load(parent);
            this.characters.push(character);
            this.formationManager.addCharacter(character);
        }
    }

    unload(parent: Container): void {
        this.characters.forEach(character => {
            this.formationManager.removeCharacter(character);
            character.unload(parent);
        });
        this.characters.length = 0;
    }

    update(gameTime: IAppTime): void {
        this.characters
            .forEach(character => character.update(gameTime));

        this.formationManager.updateSlots();
    }
}