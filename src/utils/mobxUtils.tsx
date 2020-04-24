import * as React from 'react';
import { IReactComponent } from 'mobx-react/dist/types/IReactComponent';
import { Provider as MobxProvider, observer, inject as mobxInject } from 'mobx-react';
import { ToolStore } from '../store/ToolStore';

export type Stores = {
	toolStore: ToolStore;
};

export const Provider: React.FC<{ stores?: Stores }> = ({ stores, children }) => {
	return <MobxProvider {...stores}>{children}</MobxProvider>;
};

export type StoreName = keyof Stores;

export type WithStore<K extends StoreName, P> = P & { [N in K]: Stores[K] };

export const inject = (names: StoreName[], component: IReactComponent) => {
	return mobxInject(...names)(observer(component));
};
