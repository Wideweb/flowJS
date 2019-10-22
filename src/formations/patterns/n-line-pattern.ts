import Static from "../../mathematics/static";
import IFormationPattern from "../base/formation-pattern";
import SlotAssignment from "../base/slot-assignment";
import Vector2D from '../../mathematics/vector';

export default class NLinePattern implements IFormationPattern {
    private numberOfSlots: number;
    private characterRadius: number = 30;
    private center: Vector2D;

    setSlotsNumber(number: number): void {
        this.numberOfSlots = number;
        this.center = new Vector2D(
            this.characterRadius * 2 * (Math.ceil(this.numberOfSlots / 3) / 2),
            this.characterRadius * 3,
        )
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
        const location = new Static();
        location.position.x = this.characterRadius * 2 * Math.floor(slotNumber / 3);
        location.position.y = this.characterRadius * 2 * (slotNumber % 3);
        location.position = location.position.sub(this.center);

        return location;
    }

    supportsSlots(number: number): Boolean {
        return true;
    }
}
