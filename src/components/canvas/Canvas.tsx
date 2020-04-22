import * as React from 'react';

interface Props {
	containerWidth?: number;
	containerHeight?: number;
	canvasWidth?: number;
	canvasHeight?: number;
	border?: boolean;
}

const Canvas: React.FC<Props> = (props) => {
	const { containerWidth, containerHeight, canvasWidth, canvasHeight, border } = props;

	const canvas = React.useRef<HTMLCanvasElement>(null);

	React.useEffect(() => {
		if (canvas.current) {
			canvas.current.width = canvasWidth as number;
			canvas.current.height = canvasHeight as number;
		}
	}, [canvas.current]);

	return (
		<div
			style={{
				width: containerWidth,
				height: containerHeight,
				border: border ? '2px solid black' : 0,
			}}
			className='canvas-container'
		>
			<canvas ref={canvas}></canvas>
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
