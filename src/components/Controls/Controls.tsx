import * as React from 'react';
import { WithStore, inject } from '../../utils/mobxUtils';

import './Controls.scss';
import { Art } from '../../types';

interface Props {}

const Controls: React.FC<WithStore<'artStore' | 'canvasStore', Props>> = (props) => {
	const { artStore, canvasStore } = props;

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
		</div>
	);
};

export default inject(['artStore', 'canvasStore'], Controls);
