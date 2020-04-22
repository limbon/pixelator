import * as React from 'react';

export const useRenderer = () => {
	const [renderer, setRenderer] = React.useState<CanvasRenderingContext2D | null>(null);

	React.useEffect(() => {
		setRenderer(document.querySelector('canvas')?.getContext('2d') || null);
	}, []);

	return renderer;
};
