export const compareRgb = (rgb1: Uint8ClampedArray, rgb2: Uint8ClampedArray) => {
	return rgb1.every((c, i) => c === rgb2[i]);
};
