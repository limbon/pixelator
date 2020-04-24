import { Tool } from './types';
import { drawBresenham } from './utils/drawBresenham';

export const pencil: Tool = {
	name: 'Pencil',
	activate: (renderer, currentMousePos, color, size, lastMousePos) => {
		if (lastMousePos) {
			return drawBresenham(renderer, currentMousePos, lastMousePos, color, size);
		}
	},
};
