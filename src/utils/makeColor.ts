export const makeColor = (r: number, g: number, b: number, a: number): Uint8ClampedArray => {
	const buffer = new Buffer([r, g, b, a]);
	return new Uint8ClampedArray(buffer);
};
