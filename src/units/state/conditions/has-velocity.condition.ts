import Character from '../../character';

export default class HasVelocityCondition {
	test(character: Character): Boolean {
		return character.velocity.length() !== 0;
	}
}
