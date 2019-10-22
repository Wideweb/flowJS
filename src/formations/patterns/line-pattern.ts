import Static from "../../mathematics/static";
import IFormationPattern from "../base/formation-pattern";
import SlotAssignment from "../base/slot-assignment";

export default class LinePattern implements IFormationPattern {
	private numberOfSlots: number;
	private characterRadius: number = 30;

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
		const dist = this.characterRadius * 2 * slotNumber - offset;
		
		const location = new Static();
		location.position.x = Math.cos(90 * Math.PI / 180) * dist;
        location.position.y = Math.sin(90 * Math.PI / 180) * dist;
        
		return location;
	}

	supportsSlots(number: number): Boolean {
		return true;
	}
}
