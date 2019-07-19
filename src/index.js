import * as PIXI from 'pixi.js';
import GameScreen from './screens/game-screen';
import InputManager from './input-manager';

// The application will create a renderer using WebGL, if possible,
// with a fallback to a canvas render. It will also setup the ticker
// and the root stage PIXI.Container
const app = new PIXI.Application({ width: window.innerWidth - 16, height: window.innerHeight - 20, backgroundColor: 0x560001 });
app.stage.interactive = true;
// The application will create a canvas element for you that you
// can then insert into the DOM
document.body.appendChild(app.view);

const inputManager = new InputManager(app);
let screen = new GameScreen(app.renderer.height, app.renderer.width, inputManager);
screen.load(app.stage);
app.ticker.add(() => screen.update());
