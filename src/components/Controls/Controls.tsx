import * as React from 'react';
import { WithStore, inject } from '../../utils/mobxUtils';
import { Art } from '../../types';

import './Controls.scss';

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
		const width = 32;
		const height = 32;
		const art: Art = {
			name: `new_art_${artStore.arts.length + 1}`,
			width,
			height,
			buffer: new Uint8ClampedArray(width * height * 4),
			previewUrl: '',
		};
		artStore.addArt(art);
	}, []);

	const exportArt = React.useCallback(() => {
		const { mainContext } = canvasStore;
		const { activeArt } = artStore;
		const link = document.createElement('a');
		link.setAttribute('href', mainContext.canvas!.toDataURL());
		link.setAttribute('download', activeArt!.name);
		link.click();
		document.removeChild(link);
	}, []);

	return (
		<div className='controls'>
			<button onClick={addNewArt}>New Art</button>
			<input onChange={readFile} type='file' accept='.png' />
			<button onClick={exportArt}>Export</button>
		</div>
	);
};

export default inject(['artStore', 'canvasStore'], Controls);
