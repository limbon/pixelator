export type Tool = {
	name: string;
	icon?: string;
	activate: (
		renderer: CanvasRenderingContext2D,
		currentMousePos: number[],
		color: Uint8ClampedArray,
		size: number,
		lastMousePos: number[],
		canvas: HTMLCanvasElement,
	) => any;
};

export type Context = {
	canvas: HTMLCanvasElement | null;
	renderer: CanvasRenderingContext2D | null;
};
