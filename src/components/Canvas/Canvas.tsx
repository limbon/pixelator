import * as React from 'react';
import { screenToCanvas } from '../../utils/screenToCanvas';
import { inject, WithStore } from '../../utils/mobxUtils';

import './Canvas.scss';

interface Props {}

type Stores = 'toolStore' | 'canvasStore' | 'palleteStore' | 'artStore';

const Canvas: React.FC<WithStore<Stores, Props>> = (props) => {
	const { toolStore, canvasStore, palleteStore, artStore } = props;

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
			const { width, height } = canvasStore;

			canvas.current.width = width;
			canvas.current.height = height;
		}
	}, [canvas.current, canvasStore.width, canvasStore.height]);

	React.useEffect(() => {
		const { width, height, mainContext } = canvasStore;

		if (!artStore.arts.length) {
			artStore.addArt({
				name: 'new_art',
				width: width,
				height: height,
				buffer: mainContext.renderer!.getImageData(0, 0, width, height).data,
				previewUrl: mainContext.canvas!.toDataURL(),
			});
			artStore.setArt(0);
		}
	}, []);

	React.useEffect(() => {
		const { width, height, buffer } = artStore.activeArt!;
		const { mainContext } = canvasStore;

		const imgData = mainContext.renderer!.createImageData(width, height);
		for (let i = 0; i < buffer.length; i++) {
			imgData.data[i] = buffer[i];
		}
		mainContext.renderer!.putImageData(imgData, 0, 0);
	}, [artStore.activeArt]);

	React.useEffect(() => {
		const { mainContext, pixelSize } = canvasStore;
		const { primaryColor } = palleteStore;

		if (mouseHold && mainContext.canvas) {
			const prevPos = toolStore.selectedTool.activate(
				mainContext.renderer!,
				currentMousePos,
				primaryColor,
				pixelSize,
				lastMousePos,
				mainContext.canvas!,
			);

			if (prevPos) setLastMousePos(prevPos);
		}
	}, [canvasStore.mainContext.canvas, mouseHold, currentMousePos]);

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

	const handleMouseUp = React.useCallback(() => {
		const { width, height, mainContext } = canvasStore;

		artStore.updateArt(artStore.activeIdx!, {
			...artStore.activeArt!,
			buffer: mainContext.renderer!.getImageData(0, 0, width, height).data,
			previewUrl: mainContext.canvas!.toDataURL(),
		});

		setMouseHold(false);
	}, [mouseHold, artStore.activeIdx]);

	return (
		<div className='canvas-container'>
			<canvas
				ref={canvas}
				onMouseMove={handleMouseMove}
				onMouseUp={handleMouseUp}
				onMouseDown={handleRightClick}
			></canvas>
		</div>
	);
};

export default inject(['toolStore', 'canvasStore', 'palleteStore', 'artStore'], Canvas);
