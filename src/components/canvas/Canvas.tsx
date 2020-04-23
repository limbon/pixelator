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
	const [mouseHold, setMouseHold] = React.useState<boolean>(false);
	const [currentMousePos, setCurrentMousePos] = React.useState<number[]>([0, 0]);
	const [lastMousePos, setLastMousePos] = React.useState<number[]>([0, 0]);
	const renderer = useRenderer();

	const canvas = React.useRef<HTMLCanvasElement>(null);

	React.useEffect(() => {
		if (canvas.current) {
			canvas.current.width = canvasWidth as number;
			canvas.current.height = canvasHeight as number;
		}
	}, [canvas.current]);

	React.useEffect(() => {
		if (mouseHold && renderer) {
			drawBresenham();
		}
	}, [mouseHold, renderer, currentMousePos, lastMousePos, renderer]);

	const handleRightClick = React.useCallback(
		(event: React.MouseEvent) => {
			if (canvas.current && renderer) {
				const { clientX, clientY } = event;
				const [x, y] = screenToCanvas(clientX, clientY, canvas.current!);
				setLastMousePos([x, y]);
				drawPixel(renderer, x, y, color, size);
				setMouseHold(true);
			}
		},
		[canvas.current, currentMousePos, renderer],
	);

	const handleMouseMove = React.useCallback(
		(event: React.MouseEvent) => {
			if (canvas.current) {
				const { clientX, clientY } = event;
				const [x, y] = screenToCanvas(clientX, clientY, canvas.current!);
				setCurrentMousePos([x, y]);
			}
		},
		[canvas.current],
	);

	const drawBresenham = () => {
		let x1 = currentMousePos[0],
			x2 = lastMousePos[0],
			y1 = currentMousePos[1],
			y2 = lastMousePos[1];

		let steep = Math.abs(y2 - y1) >= Math.abs(x2 - x1);
		if (steep) {
			let y = y2;
			y2 = x2;
			x2 = y;

			let x = x1;
			x1 = y1;
			y1 = x;
		}
		if (x1 > x2) {
			let x = x1;
			x1 = x2;
			x2 = x;

			let y = y1;
			y1 = y2;
			y2 = y;
		}

		let dx = x2 - x1,
			dy = Math.abs(y2 - y1),
			error = 0,
			de = dy / dx,
			yStep = -1,
			y = y1;

		if (y1 <= y2) {
			yStep = 1;
		}

		for (let x = x1; x <= x2; x++) {
			if (steep) {
				drawPixel(renderer!, y, x, color, size);
			} else {
				drawPixel(renderer!, x, y, color, size);
			}
			error += de;
			if (error >= 0.5) {
				y += yStep;
				error -= 1.0;
			}
		}
		setLastMousePos(currentMousePos);
	};

	const toggleMouseHold = React.useCallback(() => {
		setMouseHold(false);
	}, [mouseHold]);

	return (
		<div
			style={{
				width: containerWidth,
				height: containerHeight,
				border: border ? '2px solid black' : 0,
			}}
			className='canvas-container'
		>
			<canvas
				ref={canvas}
				onMouseMove={handleMouseMove}
				onMouseUp={toggleMouseHold}
				onMouseDown={handleRightClick}
			></canvas>
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
