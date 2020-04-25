import { getPixelColor } from './getPixelColor';
import { drawPixel } from './drawPixel';
import { getNeighbors } from './getNeighbors';

export const fillArea = (
	renderer: CanvasRenderingContext2D,
	startPosition: number[],
	color: string,
	canvas: HTMLCanvasElement,
) => {
	const targetColor = getPixelColor(renderer, startPosition);
	if (targetColor === color) return;

	const queue = [startPosition];

	while (queue.length) {
		const pixel = queue.pop();
		const pixelColor = getPixelColor(renderer, pixel!);
		if (pixelColor === targetColor) {
			const [x, y] = pixel!;
			drawPixel(renderer, x, y, color, 1);
			getNeighbors(canvas, pixel!).forEach((n) => {
				queue.push(n);
			});
		}
	}
};
