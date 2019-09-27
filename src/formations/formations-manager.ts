class Vector {
	public x: number = 0;
	public y: number = 0;

	add(v: Vector) {
		this.x += v.x;
		this.y += v.y;
	}

	sub(v: Vector) {
		this.x -= v.x;
		this.y -= v.y;
	}

	div(n: number) {
		this.x /= n;
		this.y /= n;
	}
}

class Static {
	position: Vector;
	orientation: number;
}

class Character {
	setTarget(location: Static) {

	}
}

interface FormationPattern {
	supportsSlots(number: number): Boolean;
	getSlotLocation(slotNumber: number): Static;
	getDriftOffset(assignments: Array<SlotAssignment>): Static;
}

class CirclePattern implements FormationPattern {
	private numberOfSlots: number;
	private characterRadius: number;

	getDriftOffset(assignments: Array<SlotAssignment>) {
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

class SlotAssignment {
	public character: Character;
	public slotNumber: number;
}

class FormationManager {

	private slotAssignments: Array<SlotAssignment> = [];
	private pattern: FormationPattern = null;
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