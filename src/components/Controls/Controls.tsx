import * as React from 'react';
import { WithStore, inject } from '../../utils/mobxUtils';

import './Controls.scss';
import { Art } from '../../types';

interface Props {}

const Controls: React.FC<WithStore<'artStore' | 'canvasStore', Props>> = (props) => {
	const [reader] = React.useState<FileReader>(new FileReader());

	const { artStore, canvasStore } = props;

	React.useEffect(() => {
		reader.onload = (evt) => {
			let dataUrl = evt.target?.result as string;
			artStore.createArtFromDataUrl(dataUrl);
		};
	}, [reader]);

	const readFile = React.useCallback(
		(evt: React.ChangeEvent<HTMLInputElement>) => {
			if (evt.target.files) {
				const file = evt.target.files[0];
				reader.readAsDataURL(new Blob([file]));
			}
		},
		[reader],
	);

	const addNewArt = React.useCallback(() => {
		const art: Art = {
			name: `new_art_${artStore.arts.length + 1}`,
			width: canvasStore.width,
			height: canvasStore.height,
			buffer: new Uint8ClampedArray(canvasStore.width * canvasStore.height * 4),
			previewUrl: '',
		};
		artStore.addArt(art);
	}, []);

	return (
		<div className='controls'>
			<button onClick={addNewArt}>New Art</button>
			<input onChange={readFile} type='file' accept='.png' />
		</div>
	);
};

export default inject(['artStore', 'canvasStore'], Controls);
