export const screenToCanvas = (x: number, y: number, canvas: HTMLCanvasElement): number[] => {
	const rect = canvas.getBoundingClientRect();
	const scaleX = canvas.width / rect.width;
	const scaleY = canvas.height / rect.height;
	return [Math.floor((x - rect.x) * scaleX), Math.floor((y - rect.y) * scaleY)];
};
