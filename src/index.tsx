import * as React from 'react';
import * as ReactDOM from 'react-dom';

import './index.scss';

import Canvas from './components/canvas/Canvas';

ReactDOM.render(
	<div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
		<Canvas canvasWidth={16} canvasHeight={16} border />
	</div>,
	document.querySelector('.root'),
);
