import * as React from 'react';
import { useRenderer } from '../../hooks/useRenderer';
import { drawPixel } from '../../utils/drawPixel';
import { screenToCanvas } from '../../utils/screenToCanvas';

import './Canvas.scss';

interface Props {
	containerWidth?: number;
	containerHeight?: number;
	canvasWidth?: number;
	canvasHeight?: number;
	border?: boolean;
}

const Canvas: React.FC<Props> = (props) => {
	const { containerWidth, containerHeight, canvasWidth, canvasHeight, border } = props;

	const [size] = React.useState(1);
	const [color] = React.useState('#000000');
	const renderer = useRenderer();

	const canvas = React.useRef<HTMLCanvasElement>(null);

	React.useEffect(() => {
		if (canvas.current) {
			canvas.current.width = canvasWidth as number;
			canvas.current.height = canvasHeight as number;
		}
	}, [canvas.current]);

	const draw = React.useCallback(
		(event: React.MouseEvent) => {
			if (renderer && canvas.current) {
				const { clientX, clientY } = event;
				const [x, y] = screenToCanvas(clientX, clientY, canvas.current);
				drawPixel(renderer, x, y, color, size);
			}
		},
		[renderer, canvas.current, size, color],
	);

	return (
		<div
			style={{
				width: containerWidth,
				height: containerHeight,
				border: border ? '2px solid black' : 0,
			}}
			className='canvas-container'
		>
			<canvas ref={canvas} onClick={draw}></canvas>
		</div>
	);
};

Canvas.defaultProps = {
	containerWidth: 512,
	containerHeight: 512,
	canvasWidth: 512,
	canvasHeight: 512,
	border: false,
};

export default Canvas;
