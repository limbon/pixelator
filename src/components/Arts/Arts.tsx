import * as React from 'react';
import { WithStore, inject } from '../../utils/mobxUtils';

import './Arts.scss';

interface Props {}

const Arts: React.FC<WithStore<'artStore', Props>> = ({ artStore }) => {
	return (
		<div className='arts'>
			<ol className='arts__list'>
				{artStore.arts.map(({ previewUrl, name }, idx) => (
					<li key={idx}>
						<button onClick={() => artStore.deleteArt(idx)}>X</button>
						<img
							// TODO: Remove index as key
							className={`${idx === artStore.activeIdx ? 'active' : ''}`}
							onClick={() => artStore.setArt(idx)}
							src={previewUrl}
						/>
						<span>{name}</span>
					</li>
				))}
			</ol>
		</div>
	);
};

export default inject(['canvasStore', 'artStore'], Arts);
