import { observable, computed, autorun } from 'mobx';
import { Context } from '../types';
import { ArtStore } from './ArtStore';

export class CanvasStore {
	constructor(private artStore: ArtStore) {}

	@observable mainContext: Context = {
		canvas: null,
		renderer: null,
	};
	@observable color: string = '#000000';
	@observable pixelSize: number = 1;

	@computed get width() {
		return this.artStore.activeArt?.width || 32;
	}

	@computed get height() {
		return this.artStore.activeArt?.height || 32;
	}
}
