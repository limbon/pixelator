import { getPixelColor } from './getPixelColor';
import { drawPixel } from './drawPixel';
import { getNeighbors } from './getNeighbors';
import { compareRgb } from './compareRgb';

export const fillArea = (
	renderer: CanvasRenderingContext2D,
	startPosition: number[],
	color: Uint8ClampedArray,
	canvas: HTMLCanvasElement,
) => {
	const targetColor = getPixelColor(renderer, startPosition);
	if (compareRgb(color, targetColor)) return;

	const queue = [startPosition];

	while (queue.length) {
		const pixel = queue.pop();
		const pixelColor = getPixelColor(renderer, pixel!);
		if (compareRgb(pixelColor, targetColor)) {
			const [x, y] = pixel!;
			drawPixel(renderer, x, y, color, 1);
			getNeighbors(canvas, pixel!).forEach((n) => {
				queue.push(n);
			});
		}
	}
};
