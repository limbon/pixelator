export type Tool = {
	name: string;
	icon?: string;
	activate: (
		renderer: CanvasRenderingContext2D,
		currentMousePos: number[],
		color: string,
		size: number,
		lastMousePos?: number[],
	) => any;
};
