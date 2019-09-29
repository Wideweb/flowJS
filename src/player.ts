import Character from "./units/character";
import FormationManager from "./formations/formations-manager";
import { IAppTime } from "./app";

export default class Player {

	characters: Array<Character> = [];
	formationManager: FormationManager = new FormationManager();

	constructor() {

	}

	load(container: any): void {
		const character = new Character();
		character.load(container);
		this.characters.push(character);
	}

	unload(container: any): void {
		this.characters
			.forEach(character => character.unload(container));
		this.characters.length = 0;
	}

	update(gameTime: IAppTime): void {
		this.characters
			.forEach(character => character.update(gameTime));
	}
}