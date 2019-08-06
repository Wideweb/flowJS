import InitialScreen from './screens/initial-screen';
import GameScreen from './screens/game-screen';

import InputManager from './input-manager';

const SCREENS = {
    INITIAL: InitialScreen,
    GAME: GameScreen,
}

export default class ScreenFactory {
    static create(screen) {
        switch (screen) {
            case SCREENS.INITIAL:
                return new SCREENS.INITIAL();
            case SCREENS.GAME:
                return new SCREENS.GAME();
        }
    }
}