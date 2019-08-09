import MenuItem from './menu-item';

export default class Menu {
    constructor(config, height, width, onSelect) {
        this.config = config;
        this.items = [];
        this.width = width;
        this.height = height;
        this.onSelect = onSelect;
    }

    load(container) {
        const itemsGap = 10;
        const itemWidth = 400;
        let itemHeight = 100;

        const menuHeight = this.config.length * (itemHeight + itemsGap);
        const menuY = this.height / 2 - menuHeight;

        for (let i = 0; i < this.config.length; i++) {
            const item = new MenuItem(
                itemHeight,
                itemWidth,
                this.width / 2 - itemWidth / 2,
                menuY + (itemHeight + itemsGap) * i,
                itemHeight / 2,
                this.config[i],
                this.onSelect,
            );

            item.load(container);
            this.items.push(item);
        }
    }

    unload(container) {
        this.items.forEach(item => item.unload(container));
    }

    update(gameTime) {
    }
}