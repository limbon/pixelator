const decToHex = (n: number) => {
	const hex = n.toString(16);
	return hex.length === 1 ? `0${hex}` : hex;
};

export const rgbToHex = (rgb: Uint8ClampedArray) => {
	return `#${decToHex(rgb[0])}${decToHex(rgb[1])}${decToHex(rgb[2])}`;
};
