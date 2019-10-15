import Static from "../../mathematics/static";
import IFormationPattern from "../base/formation-pattern";
import SlotAssignment from "../base/slot-assignment";

export default class LinePattern implements IFormationPattern {
	private numberOfSlots: number;
	private characterRadius: number = 10;

	setSlotsNumber(number: number): void {
		this.numberOfSlots = number;
	}

	getDriftOffset(assignments: Array<SlotAssignment>): Static {
		const center = new Static();
		for (let i = 0; i < assignments.length; i++) {
			const location = assignments[i].character.location;
			center.position = center.position.add(location.position);
			center.orientation += location.orientation;
		}

		center.position = center.position.div(assignments.length);
		center.orientation /= assignments.length;
		return center;
	}

	getSlotLocation(slotNumber: number): Static {
        const offset = this.characterRadius * this.numberOfSlots;

		const location = new Static();
		location.position.x = 0;
        location.position.y = this.characterRadius * 2 * slotNumber - offset;
        
		return location;
	}

	supportsSlots(number: number): Boolean {
		return true;
	}
}
