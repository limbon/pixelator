import { observable, action } from 'mobx';

export class PalleteStore {
	@observable primaryColor = '#000000';
	@observable secondaryColor = '#ff0000';

	@action
	swapColors() {
		const temp = this.primaryColor;
		this.primaryColor = this.secondaryColor;
		this.secondaryColor = temp;
	}

	@action
	setPrimaryColor(color: string) {
		this.primaryColor = color;
	}

	@action
	setSecondaryColor(color: string) {
		this.secondaryColor = color;
	}
}
