import * as React from 'react';
import { screenToCanvas } from '../../utils/screenToCanvas';

import './Canvas.scss';
import { inject, WithStore } from '../../utils/mobxUtils';

interface Props {
	containerWidth?: number;
	containerHeight?: number;
	border?: boolean;
}

const Canvas: React.FC<WithStore<
	'toolStore' | 'canvasStore' | 'palleteStore' | 'artStore',
	Props
>> = (props) => {
	const {
		containerWidth,
		containerHeight,
		border,
		toolStore,
		canvasStore,
		palleteStore,
		artStore,
	} = props;

	const [mouseHold, setMouseHold] = React.useState<boolean>(false);
	const [currentMousePos, setCurrentMousePos] = React.useState<number[]>([0, 0]);
	const [lastMousePos, setLastMousePos] = React.useState<number[]>([0, 0]);

	const canvas = React.useRef<HTMLCanvasElement>(null);

	React.useEffect(() => {
		if (canvas.current) {
			canvasStore.mainContext.canvas = canvas.current;
			canvasStore.mainContext.renderer = canvas.current.getContext('2d');
		}
	}, [canvas.current]);

	React.useEffect(() => {
		if (canvas.current) {
			canvas.current.width = canvasStore.width;
			canvas.current.height = canvasStore.height;
		}
	}, [canvas.current]);

	React.useEffect(() => {
		if (!artStore.arts.length) {
			artStore.addArt({
				name: 'new_art',
				width: canvasStore.width,
				height: canvasStore.height,
				buffer: canvasStore.mainContext.renderer!.getImageData(
					0,
					0,
					canvasStore.width,
					canvasStore.height,
				).data,
				previewUrl: canvasStore.mainContext.canvas!.toDataURL(),
			});
			artStore.setArt(0);
		}
	}, []);

	React.useEffect(() => {
		const { width, height, buffer } = artStore.artiveArt!;
		const imgData = canvasStore.mainContext.renderer!.createImageData(width, height);
		for (let i = 0; i < buffer.length; i++) {
			imgData.data[i] = buffer[i];
		}
		canvasStore.mainContext.renderer!.putImageData(imgData, 0, 0);
	}, []);

	React.useEffect(() => {
		if (mouseHold && canvas.current) {
			const lastPos = toolStore.selectedTool.activate(
				canvasStore.mainContext.renderer!,
				currentMousePos,
				palleteStore.primaryColor,
				canvasStore.size,
				lastMousePos,
				canvas.current,
			);
			if (lastPos) {
				setLastMousePos(lastPos);
			}
		}
	}, [canvas.current, mouseHold, currentMousePos, lastMousePos]);

	const handleRightClick = React.useCallback(
		({ clientX, clientY }: React.MouseEvent) => {
			if (canvas.current) {
				const [x, y] = screenToCanvas(clientX, clientY, canvas.current!);
				setLastMousePos([x, y]);
				setMouseHold(true);
			}
		},
		[canvas.current, currentMousePos],
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
		artStore.updateArt(artStore.activeIdx!, {
			...artStore.artiveArt!,
			buffer: canvasStore.mainContext.renderer!.getImageData(
				0,
				0,
				canvasStore.width,
				canvasStore.height,
			).data,
			previewUrl: canvasStore.mainContext.canvas!.toDataURL(),
		});
		setMouseHold(false);
	}, [mouseHold, artStore.activeIdx]);

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

export default inject(['toolStore', 'canvasStore', 'palleteStore', 'artStore'], Canvas);
