import * as React from 'react';
import { Art } from '../../types';
import { WithStore, inject } from '../../utils/mobxUtils';

interface Props {}

const Arts: React.FC<WithStore<'canvasStore', Props>> = ({ canvasStore }) => {
	const [art, setArt] = React.useState<Art>({
		name: 'New Art',
		buffer: new Uint8ClampedArray(),
		preview: new Image(),
	});

	const save = React.useCallback(() => {
		const canvas = document.querySelector('canvas');
		const { data } = canvasStore.mainContext.renderer!.getImageData(
			0,
			0,
			canvas?.width || 32,
			canvas?.height || 32,
		);
		const preview = new Image();
		preview.width = 100;
		preview.height = 100;
		preview.src = `${canvas?.toDataURL()}`;

		setArt({
			name: 'New Art',
			buffer: data,
			preview,
		});
	}, []);

	return (
		<div>
			<button onClick={save}>Save</button>
			<div>
				<img
					style={{ imageRendering: '-moz-crisp-edges' }}
					width='100px'
					height='100px'
					src={art.preview.src}
				/>
			</div>
		</div>
	);
};

export default inject(['canvasStore'], Arts);
