export default class Blackboard {
	constructor(
		private data: Object,
		private parent: Blackboard,
	) { }

	get<T>(name: string): T {
		if (this.data[name]) {
			return this.data[name] as T;
		}
		else if (this.parent) {
			return this.parent.get<T>(name);
		}

		return null;
	}
}