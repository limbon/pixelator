import 'mobx-react-lite/batchingForReactDom';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Provider } from './utils/mobxUtils';

import { ToolStore } from './store/ToolStore';
import { CanvasStore } from './store/CanvasStore';
import { PalleteStore } from './store/PalleteStore';
import { ArtStore } from './store/ArtStore';

import './index.scss';

import App from './App';

const artStore = new ArtStore();
const canvasStore = new CanvasStore(artStore);
const toolStore = new ToolStore();
const palleteStore = new PalleteStore();

const stores = {
	toolStore,
	canvasStore,
	palleteStore,
	artStore,
};

ReactDOM.render(
	<Provider stores={stores}>
		<App />
	</Provider>,
	document.querySelector('.root'),
);
