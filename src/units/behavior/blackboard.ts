export default class Blackboard {
	constructor(
		private data: Object,
		private parent: Blackboard,
	) { }

	get(name: string): any {
		if (this.data[name]) {
			return this.data[name];
		}
		else if (this.parent) {
			return this.parent.get(name);
		}

		return null;
	}
}