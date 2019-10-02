import Static from "../../mathematics/static";
import IFormationPattern from "../base/formation-pattern";
import SlotAssignment from "../base/slot-assignment";

export default class CirclePattern implements IFormationPattern {
	private numberOfSlots: number;
	private characterRadius: number;

	setSlotsNumber(number: number): void {
		this.numberOfSlots = number;
	}

	getDriftOffset(assignments: Array<SlotAssignment>): Static {
		const center = new Static();
		for (let i = 0; i < assignments.length; i++) {
			const location = this.getSlotLocation(i);
			center.position.add(location.position);
			center.orientation += location.orientation;
		}

		center.position.div(assignments.length);
		center.orientation /= assignments.length;
		return center;
	}

	getSlotLocation(slotNumber: number): Static {
		const angleAroundCircle = slotNumber / this.numberOfSlots * Math.PI * 2;
		const radius = this.characterRadius / Math.sin(Math.PI / this.numberOfSlots);

		const location = new Static();
		location.position.x = radius * Math.cos(angleAroundCircle);
		location.position.y = radius * Math.sin(angleAroundCircle);

		location.orientation = angleAroundCircle;
		return location;
	}

	supportsSlots(number: number): Boolean {
		return true;
	}
}
