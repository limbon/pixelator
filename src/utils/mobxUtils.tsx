import * as React from 'react';
import { IReactComponent } from 'mobx-react/dist/types/IReactComponent';
import { Provider as MobxProvider, observer, inject as mobxInject } from 'mobx-react';

import { ToolStore } from '../store/ToolStore';
import { CanvasStore } from '../store/CanvasStore';
import { PalleteStore } from '../store/PalleteStore';

export type Stores = {
	toolStore: ToolStore;
	canvasStore: CanvasStore;
	palleteStore: PalleteStore;
};

export const Provider: React.FC<{ stores?: Stores }> = ({ stores, children }) => {
	return <MobxProvider {...stores}>{children}</MobxProvider>;
};

export type StoreName = keyof Stores;

export type WithStore<K extends StoreName, P> = P & Pick<Stores, K>;

export const inject = (names: StoreName[], component: IReactComponent) => {
	return mobxInject(...names)(observer(component));
};
