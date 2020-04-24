import 'mobx-react-lite/batchingForReactDom';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Provider } from './utils/mobxUtils';

import { ToolStore } from './store/ToolStore';

import './index.scss';

import Canvas from './components/canvas/Canvas';
import ToolRack from './components/ToolRack/ToolRack';
import { CanvasStore } from './store/CanvasStore';

ReactDOM.render(
	<Provider
		stores={{
			toolStore: new ToolStore(),
			canvasStore: new CanvasStore(),
		}}
	>
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
			<ToolRack />
			<Canvas border />
		</div>
	</Provider>,
	document.querySelector('.root'),
);
