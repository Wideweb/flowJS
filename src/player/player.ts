import { Container } from 'pixi.js';
import Character from "../units/character";
import FormationManager from "../formations/formations-manager";
import { IAppTime } from "../app";
import GameObject from '../game-object';
import ISteereing from '../units/movement/steering';
import Arrive from '../units/movement/arrive';
import Vector2D from '../mathematics/vector';
import LinePattern from '../formations/patterns/line-pattern';
import IFormationPattern from '../formations/base/formation-pattern';

export default class Player extends GameObject {

    characters: Array<Character> = [];
    formationManager: FormationManager = new FormationManager();
    target: GameObject = new GameObject();
    movement: ISteereing;

    setTarget(target: GameObject) {
        this.target = target;
    }

    settPattern(pattern: IFormationPattern) {
        this.formationManager.setPattern(pattern);
    }

    load(parent: Container): void {
        this.location.position = new Vector2D(300, 300);
        this.target.location.position = new Vector2D(300, 300);
        this.formationManager.setPattern(new LinePattern());
        for (let i = 0; i < 9; i++) {
            const character = new Character(i === 4 ? 'lead' : 'human');
            character.load(parent);
            this.characters.push(character);
            this.formationManager.addCharacter(character);
        }
        this.movement = new Arrive(this);
    }

    unload(parent: Container): void {
        this.characters.forEach(character => {
            this.formationManager.removeCharacter(character);
            character.unload(parent);
        });
        this.characters.length = 0;
    }

    update(gameTime: IAppTime): void {
        const aligned = this.formationManager.updateSlots(this.location);

        if (aligned) {
            const steering = this.movement.getSteering(this.target);

            if (steering !== null) {
                this.velocity.x += steering.linear.x;
                this.velocity.y += steering.linear.y;

                this.location.position.x += this.velocity.x;
                this.location.position.y += this.velocity.y;
            } else {
                this.velocity.x = 0;
                this.velocity.y = 0;
            }
        }

        this.characters
            .forEach(character => character.update(gameTime));
    }
}