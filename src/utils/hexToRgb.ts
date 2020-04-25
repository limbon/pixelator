import { makeColor } from './makeColor';

export const hexToRgb = (hex: string): Uint8ClampedArray => {
	hex = hex.slice(1);
	let r = parseInt(hex.substring(0, 2), 16),
		g = parseInt(hex.substring(2, 4), 16),
		b = parseInt(hex.substring(4, 6), 16),
		a = parseInt(hex.substring(6, 8), 16);

	return makeColor(r, g, b, a);
};
