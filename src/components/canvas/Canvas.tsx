import * as React from 'react';
import { useRenderer } from '../../hooks/useRenderer';
import { screenToCanvas } from '../../utils/screenToCanvas';

import './Canvas.scss';
import { inject, WithStore } from '../../utils/mobxUtils';

interface Props {
	containerWidth?: number;
	containerHeight?: number;
	border?: boolean;
}

const Canvas: React.FC<WithStore<'toolStore' | 'canvasStore', Props>> = (props) => {
	const { containerWidth, containerHeight, border, toolStore, canvasStore } = props;

	const [mouseHold, setMouseHold] = React.useState<boolean>(false);
	const [currentMousePos, setCurrentMousePos] = React.useState<number[]>([0, 0]);
	const [lastMousePos, setLastMousePos] = React.useState<number[]>([0, 0]);
	const renderer = useRenderer();

	const canvas = React.useRef<HTMLCanvasElement>(null);

	React.useEffect(() => {
		if (canvas.current) {
			canvas.current.width = canvasStore.width;
			canvas.current.height = canvasStore.height;
		}
	}, [canvas.current]);

	React.useEffect(() => {
		if (mouseHold && renderer) {
			const lastPos = toolStore.selectedTool.activate(
				renderer,
				currentMousePos,
				canvasStore.color,
				canvasStore.size,
				lastMousePos,
			);
			if (lastPos) {
				setLastMousePos(lastPos);
			}
		}
	}, [mouseHold, renderer, currentMousePos, lastMousePos, renderer]);

	const handleRightClick = React.useCallback(
		({ clientX, clientY }: React.MouseEvent) => {
			if (canvas.current && renderer) {
				const [x, y] = screenToCanvas(clientX, clientY, canvas.current!);
				setLastMousePos([x, y]);
				setMouseHold(true);
			}
		},
		[canvas.current, currentMousePos, renderer],
	);

	const handleMouseMove = React.useCallback(
		({ clientX, clientY }: React.MouseEvent) => {
			if (canvas.current) {
				const [x, y] = screenToCanvas(clientX, clientY, canvas.current!);
				setCurrentMousePos([x, y]);
			}
		},
		[canvas.current],
	);

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
	border: false,
};

export default inject(['toolStore', 'canvasStore'], Canvas);
