export const drawPixel = (
	renderer: CanvasRenderingContext2D,
	x: number,
	y: number,
	color: string,
	size: number,
) => {
	renderer.fillStyle = color;
	renderer.fillRect(x, y, size, size);
};
