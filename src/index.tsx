import 'mobx-react-lite/batchingForReactDom';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Provider } from './utils/mobxUtils';

import './index.scss';

import Canvas from './components/canvas/Canvas';

ReactDOM.render(
	<Provider stores={{}}>
		<div
			style={{
				height: '100vh',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<Canvas canvasWidth={64} canvasHeight={64} border />
		</div>
	</Provider>,
	document.querySelector('.root'),
);
