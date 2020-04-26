import { observable, action, computed } from 'mobx';
import { Art } from '../types';

export class ArtStore {
	@observable arts: Art[] = [];
	@observable activeIdx: number | null = null;

	@computed get artiveArt() {
		return this.activeIdx !== null && this.activeIdx >= 0 ? this.arts[this.activeIdx] : null;
	}

	@action
	setArt(idx: number) {
		this.activeIdx = idx;
	}

	@action
	deleteArt(idx: number) {
		this.arts = this.arts.filter((_, i) => i !== idx);
	}

	@action
	updateArt(idx: number, newArt: Art) {
		this.arts[idx] = newArt;
	}

	@action
	addArt(art: Art) {
		this.arts.push(art);
	}
}
