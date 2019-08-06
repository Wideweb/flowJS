export default class InitialScreen {
    constructor() {
        this.delay;
    }

    load(container) {

    }

    unload(container) {

    }

    update(time) {
        if (gameTime.TotalGameTime.TotalSeconds > Delay && !ScreenManager.Instance.isTransitioning) {
            ScreenManager.Instance.ChangeScreens("Menu.TitleScreen");
        }

        if (InputManager.Instance.keyPressed(Keys.Enter, Keys.Z))
            ScreenManager.Instance.ChangeScreens("Menu.TitleScreen");
    }
}