import IFormationPattern from "./base/formation-pattern";
import SlotAssignment from "./base/slot-assignment";
import Static from "../mathematics/static";

export default class FormationManager {

	private slotAssignments: Array<SlotAssignment> = [];
	private pattern: IFormationPattern = null;
	private driftOffset: Static;

	updateSlotAssignments() {
		for (let i = 0; i < this.slotAssignments.length; i++) {
			this.slotAssignments[i].slotNumber = i;
		}

		this.driftOffset = this.pattern.getDriftOffset(this.slotAssignments);
	}

	addCharacter(character) {
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

	removeCharacter(character) {
		const slotIndex = this.slotAssignments.findIndex(x => x.character === character);
		this.slotAssignments.splice(slotIndex, 1);
		this.updateSlotAssignments();
	}

	updateSlots() {
		for (let i = 0; i < this.slotAssignments.length; i++) {
			const relativeLocation = this.pattern.getSlotLocation(i);
			const location = new Static();
			location.position = relativeLocation.position;
			location.orientation = relativeLocation.orientation;

			location.position.sub(this.driftOffset.position);
			location.orientation -= this.driftOffset.orientation;

			this.slotAssignments[i].character.setTarget(location);
		}
	}
}