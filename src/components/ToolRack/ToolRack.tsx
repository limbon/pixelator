import * as React from 'react';
import { WithStore, inject } from '../../utils/mobxUtils';

import './ToolRack.scss';

interface Props {}

const ToolRack: React.FC<WithStore<'toolStore', Props>> = ({ toolStore }) => {
	return (
		<div className='toolrack'>
			{toolStore.tools.map(({ name }, idx) => (
				<div
					className={`toolrack__tool ${toolStore.selectedTool.name === name ? 'active' : ''}`}
					key={name}
					onClick={() => toolStore.select(idx)}
				>
					<h1>{name.charAt(0)}</h1>
				</div>
			))}
		</div>
	);
};

export default inject(['toolStore'], ToolRack);
