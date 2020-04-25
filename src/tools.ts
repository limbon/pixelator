import { Tool } from './types';
import { drawBresenham } from './utils/drawBresenham';
import { fillArea } from './utils/fillArea';

export const pencil: Tool = {
	name: 'Pencil',
	activate: (renderer, currentMousePos, color, size, lastMousePos) => {
		if (lastMousePos) {
			return drawBresenham(renderer, currentMousePos, lastMousePos, color, size);
		}
	},
};

export const bucket: Tool = {
	name: 'Bucket',
	activate: (renderer, currentMousePos, color, size, lastMousePos, canvas) => {
		fillArea(renderer, currentMousePos, color, canvas);
	},
};
