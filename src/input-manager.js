export default class InputManager {
    constructor() {
        this.handlers = {
            pointermove: [],
        };
        this.innerPointer = { x: 0, y: 0 };
    }

    static get instance() {
        if (!InputManager._instance) {
            InputManager._instance = new InputManager();
        }

        return InputManager._instance;
    }

    set app(value) {
        this._app = value;
        this._app.stage.on('pointermove', (event) => {
            this.innerPointer.x = event.data.global.x;
            this.innerPointer.y = event.data.global.y;
        });
    }

    get app() {
        return this._app;
    }

    get pointer() {
        const x = this.innerPointer.x - this.app.stage.x;
        const y = this.innerPointer.y - this.app.stage.y;
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