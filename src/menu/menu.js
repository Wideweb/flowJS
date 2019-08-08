import MenuItem from './menu-item';

export default class Menu {
    constructor(config, width, height) {
		this.config = config;
		this.items = [];
		this.width = width;
		this.height = height;
    }

    load(container) {
		const itemsGap = 10;
		const itemHeight = this.height / this.config.length - itemsGap;
		const itemWidth = this.width;

        for (let i = 0; i < this.config.length; i++) {
			const item = new MenuItem(
				itemHeight,
				itemWidth,
				0,
				(itemHeight + itemsGap) * i,
				itemHeight / 2,
				this.config[i],
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