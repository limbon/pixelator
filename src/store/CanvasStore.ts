import { observable } from 'mobx';

export class CanvasStore {
	@observable color: string = '#000000';
	@observable size: number = 1;
	@observable width: number = 32;
	@observable height: number = 32;
}
