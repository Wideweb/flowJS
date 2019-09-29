import * as PIXI from 'pixi.js';

export default class Graphics {
    static createRadialGradTexture(from, to) {
        const quality = 256;
        const canvas = document.createElement('canvas');
        canvas.width = quality;
        canvas.height = quality;

        const ctx = canvas.getContext('2d');

        const grd = ctx.createRadialGradient(quality / 2, quality / 2, 0, quality / 2, quality / 2, quality);
        grd.addColorStop(0, from);
        grd.addColorStop(1, to);

        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, quality, quality);

        return PIXI.Texture.from(canvas);
    }
}