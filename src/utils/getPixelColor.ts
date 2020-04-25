export const getPixelColor = (renderer: CanvasRenderingContext2D, position: number[]) => {
	const [x, y] = position;
	const { data } = renderer.getImageData(x, y, 1, 1);
	return data;
};
