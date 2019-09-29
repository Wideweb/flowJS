import Static from "../../mathematics/static";
import SlotAssignment from "./slot-assignment";

export default interface IFormationPattern {
	setSlotsNumber(number: number): void;
	supportsSlots(number: number): Boolean;
	getSlotLocation(slotNumber: number): Static;
	getDriftOffset(assignments: Array<SlotAssignment>): Static;
}