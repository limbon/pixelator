import * as React from 'react';
import { WithStore, inject } from '../../utils/mobxUtils';

import './Arts.scss';

interface Props {}

const Arts: React.FC<WithStore<'artStore', Props>> = ({ artStore }) => {
	return (
		<div className='arts'>
			<div className='arts__list'>
				{artStore.arts.map(({ previewUrl }, idx) => (
					<img
						// TODO: Remove index as key
						key={idx}
						className={`${idx === artStore.activeIdx ? 'active' : ''}`}
						onClick={() => artStore.setArt(idx)}
						src={previewUrl}
					/>
				))}
			</div>
		</div>
	);
};

export default inject(['canvasStore', 'artStore'], Arts);
