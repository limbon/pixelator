import { rgbToHex } from './rgbToHex';

export const drawPixel = (
	renderer: CanvasRenderingContext2D,
	x: number,
	y: number,
	color: Uint8ClampedArray,
	size: number,
) => {
	renderer.fillStyle = rgbToHex(color);
	renderer.fillRect(x, y, size, size);
};
