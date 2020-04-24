import { drawPixel } from './drawPixel';

export const drawBresenham = (
	renderer: CanvasRenderingContext2D,
	currentMousePos: number[],
	lastMousePos: number[],
	color: string,
	size: number,
) => {
	let x1 = currentMousePos[0],
		x2 = lastMousePos[0],
		y1 = currentMousePos[1],
		y2 = lastMousePos[1];

	let steep = Math.abs(y2 - y1) >= Math.abs(x2 - x1);
	if (steep) {
		let y = y2;
		y2 = x2;
		x2 = y;

		let x = x1;
		x1 = y1;
		y1 = x;
	}
	if (x1 > x2) {
		let x = x1;
		x1 = x2;
		x2 = x;

		let y = y1;
		y1 = y2;
		y2 = y;
	}

	let dx = x2 - x1,
		dy = Math.abs(y2 - y1),
		error = 0,
		de = dy / dx,
		yStep = -1,
		y = y1;

	if (y1 <= y2) {
		yStep = 1;
	}

	for (let x = x1; x <= x2; x++) {
		if (steep) {
			drawPixel(renderer, y, x, color, size);
		} else {
			drawPixel(renderer, x, y, color, size);
		}
		error += de;
		if (error >= 0.5) {
			y += yStep;
			error -= 1.0;
		}
	}
	return currentMousePos;
};
