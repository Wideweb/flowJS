import IComparable from "../comparable";

export default class PriorityQueue<T extends IComparable> {
	private list: T[] = [];

	contains(predicate: (node: T) => boolean): boolean {
		return this.list.some(predicate);
	}

	find(predicate: (node: T) => boolean) {
		return this.list.find(predicate);
	}

	length(): number {
		return this.list.length;
	}

	public enqueue(element: T) {
		this.list.push(element);
		this.up(this.list.length - 1);
	}

	public dequeue() {
		const element = this.list[0];
		if (this.list.length > 0) {
			this.swap(0, this.list.length - 1);
			this.list.length--;
			this.down(0);
		}
		return element;
	}

	private up(i: number): void {
		//Check whether the current element bigger than child
		while (i != 0 && this.list[i].compareTo(this.list[Math.floor((i - 1) / 2)]) > 0) {
			this.swap(i, Math.floor((i - 1) / 2));
			i = Math.floor((i - 1) / 2);
		}
	}

	private down(i: number): void {
		while (i < Math.floor(this.list.length / 2)) {
			let maxI = 2 * i + 1;

			//Take the biggest child
			if (2 * i + 2 < this.list.length && this.list[2 * i + 2].compareTo(this.list[2 * i + 1]) > 0) {
				maxI = 2 * i + 2;
			}

			//Check whether the current element bigger than child
			if (this.list[i].compareTo(this.list[maxI]) >= 0) {
				return;
			}

			this.swap(i, maxI);
			i = maxI;
		}
	}

	private swap(fistIndex: number, secondIndex: number) {
		const firstElement = this.list[fistIndex];
		this.list[fistIndex] = this.list[secondIndex];
		this.list[secondIndex] = firstElement;
	}
}