import App from './app';

export default class InputManager {
    constructor() {
        this.handlers = {
            pointermove: [],
        };
		this.innerPointer = { x: 0, y: 0 };
		App.instance.stage.on('pointermove', (event) => {
            this.innerPointer.x = event.data.global.x;
            this.innerPointer.y = event.data.global.y;
        });
    }

    static get instance() {
        if (!InputManager._instance) {
            InputManager._instance = new InputManager();
        }

        return InputManager._instance;
    }

    get pointer() {
        const x = this.innerPointer.x - App.instance.stage.x;
        const y = this.innerPointer.y - App.instance.stage.y;
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