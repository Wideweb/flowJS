import { Container } from 'pixi.js';
import Character from "../units/character";
import FormationManager from "../formations/formations-manager";
import { IAppTime } from "../app";
import Vector2D from '../mathematics/vector';

export default class Player {

	characters: Array<Character> = [];
	formationManager: FormationManager = new FormationManager();

	setTarget(position: Vector2D) {
		this.characters.forEach(character => character.setTarget(position));
	}

	load(parent: Container): void {
		const character = new Character();
		character.load(parent);
		this.characters.push(character);
	}

	unload(parent: Container): void {
		this.characters
			.forEach(character => character.unload(parent));
		this.characters.length = 0;
	}

	update(gameTime: IAppTime): void {
		this.characters
			.forEach(character => character.update(gameTime));
	}
}