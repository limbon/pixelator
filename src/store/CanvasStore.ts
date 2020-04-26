import { observable } from 'mobx';
import { Context } from '../types';

export class CanvasStore {
	@observable mainContext: Context = {
		canvas: null,
		renderer: null,
	};
	@observable color: string = '#000000';
	@observable size: number = 1;
	@observable width: number = 32;
	@observable height: number = 32;
}
