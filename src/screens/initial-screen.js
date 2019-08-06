export default class InitialScreen {
    constructor(height, width, screenManager, inputManager) {
        this.delay;
    }

    load(container) {

    }

    unload(container) {

    }

    update(time) {
        if (gameTime.TotalGameTime.TotalSeconds > Delay && !ScreenManager.Instance.isTransitioning) {
            ScreenManager.instance.changeScreen("Menu.TitleScreen");
        }

        if (InputManager.Instance.keyPressed(Keys.Enter, Keys.Z))
            ScreenManager.Instance.changeScreen("Menu.TitleScreen");
    }
}