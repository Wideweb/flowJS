import IFormationPattern from "./base/formation-pattern";
import SlotAssignment from "./base/slot-assignment";
import Character from "../units/character";
import GameObject from '../game-object';
import Static from '../mathematics/static';

export default class FormationManager {

    private slotAssignments: Array<SlotAssignment> = [];
    private pattern: IFormationPattern;

    setPattern(pattern: IFormationPattern) {
        this.pattern = pattern;
        const characters = this.slotAssignments.map(s => s.character);
        this.slotAssignments = [];
        characters.forEach(c => this.addCharacter(c));
    }

    updateSlotAssignments(): void {
        for (let i = 0; i < this.slotAssignments.length; i++) {
            this.slotAssignments[i].slotNumber = i;
        }
    }

    addCharacter(character: Character): boolean {
        const occupiedSlots = this.slotAssignments.length;

        if (this.pattern.supportsSlots(occupiedSlots + 1)) {
            const slotAssignment = new SlotAssignment();
            slotAssignment.character = character;
            this.slotAssignments.push(slotAssignment);

            this.pattern.setSlotsNumber(occupiedSlots + 1);
            this.updateSlotAssignments();
            return true;
        }

        return false;
    }

    removeCharacter(character: Character): void {
        const slotIndex = this.slotAssignments.findIndex(x => x.character === character);
        this.slotAssignments.splice(slotIndex, 1);
        this.updateSlotAssignments();
    }

    updateSlots(center: Static): boolean {
        let aligned = true;
        for (let i = 0; i < this.slotAssignments.length; i++) {
            const character = this.slotAssignments[i].character;
            const relativeLocation = this.pattern.getSlotLocation(i);
            const targetPoint = center.position.add(relativeLocation.position.rotate(center.orientation));
            const target = GameObject.createFromPoint(targetPoint);
            character.setTarget(target);
            aligned = aligned && character.location.position.sub(targetPoint).length() < 10;
        }

        return aligned;
    }
}
