import 'mobx-react-lite/batchingForReactDom';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Provider } from './utils/mobxUtils';

import { ToolStore } from './store/ToolStore';
import { CanvasStore } from './store/CanvasStore';
import { PalleteStore } from './store/PalleteStore';
import { ArtStore } from './store/ArtStore';

import './index.scss';

import Canvas from './components/Canvas/Canvas';
import ToolRack from './components/ToolRack/ToolRack';

import Pallete from './components/Pallete/Pallete';
import Arts from './components/Arts/Arts';

const stores = {
	toolStore: new ToolStore(),
	canvasStore: new CanvasStore(),
	palleteStore: new PalleteStore(),
	artStore: new ArtStore(),
};

ReactDOM.render(
	<Provider stores={stores}>
		<div
			style={{
				height: '100vh',
				display: 'grid',
				gridAutoFlow: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				gap: '1rem',
			}}
		>
			<div
				style={{
					height: '512px',
					display: 'grid',
					gridTemplateRows: '1fr auto',
					gap: '1rem',
				}}
			>
				<ToolRack />
				<Pallete />
			</div>
			<Canvas border />
			<Arts />
		</div>
	</Provider>,
	document.querySelector('.root'),
);
