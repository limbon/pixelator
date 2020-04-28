import { observable, action } from 'mobx';
import { makeColor } from '../utils/makeColor';

export class PalleteStore {
	@observable primaryColor = makeColor(0, 0, 0, 255);
	@observable secondaryColor = makeColor(255, 255, 255, 255);

	@action
	swapColors() {
		const temp = this.primaryColor;
		this.primaryColor = this.secondaryColor;
		this.secondaryColor = temp;
	}

	@action
	setPrimaryColor(color: Uint8ClampedArray) {
		this.primaryColor = color;
	}

	@action
	setSecondaryColor(color: Uint8ClampedArray) {
		this.secondaryColor = color;
	}
}
