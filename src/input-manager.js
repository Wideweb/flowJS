export default class InputManager {
	constructor(app) {
		this.app = app;
		this.handlers = {
			pointermove: [],
		};

		app.stage.on('pointermove', (event) => this.notify('pointermove', { x: event.data.global.x, y: event.data.global.y }));
	}

	get pointer() {
		const x = this.app.renderer.plugins.interaction.mouse.global.x - this.app.stage.x;
		const y = this.app.renderer.plugins.interaction.mouse.global.y - this.app.stage.y;
		console.log(x, y);
		return { x, y };
	}

	onPointerMove(handler) {
		this.handlers['pointermove'].push(handler);
	}

	unsubscribeOnMove(handler) {
		const index = this.handlers[event].findIndex(h => h === handler);
		this.handlers[event].splice(index, 1);
	}

	notify(event, data) {
		this.handlers[event].forEach(handler => handler(data));
	}
}