export const getNeighbors = (canvas: HTMLCanvasElement, position: number[]) => {
	const [x, y] = position;

	const neighbors = [
		[x, y - 1],
		[x + 1, y],
		[x, y + 1],
		[x - 1, y],
	];
	return neighbors.filter(
		([x, y]) => x >= 0 && x < canvas.width && y >= 0 && y < canvas.height,
	);
};
