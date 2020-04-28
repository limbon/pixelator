import { observable, action, computed } from 'mobx';
import { Art } from '../types';

export class ArtStore {
	@observable arts: Art[] = [];
	@observable activeIdx: number | null = null;

	@computed get activeArt() {
		return this.activeIdx !== null && this.activeIdx >= 0 ? this.arts[this.activeIdx] : null;
	}

	@action
	createArtFromDataUrl(dataUrl: string, name?: string) {
		let image = new Image();
		image.src = dataUrl;
		image.onload = () => {
			const canvas = document.createElement('canvas');
			const renderer = canvas.getContext('2d')!;
			canvas.width = image.width;
			canvas.height = image.height;
			renderer.drawImage(image, 0, 0, image.width, image.height);
			const imgData = renderer.getImageData(0, 0, canvas.width, canvas.height);

			const art: Art = {
				name: name || `new_art_${this.arts.length + 1}`,
				width: canvas.width,
				height: canvas.height,
				buffer: imgData!.data,
				previewUrl: canvas.toDataURL(),
			};

			this.addArt(art);
			this.setArt(this.arts.length - 1);
			canvas.remove();
		};
	}

	@action
	setArt(idx: number) {
		this.activeIdx = idx;
	}

	@action
	deleteArt(idx: number) {
		if (this.arts.length > 1) {
			if (this.activeIdx !== null && this.activeIdx > 0) {
				this.setArt(this.activeIdx - 1);
			}
			this.arts = this.arts.filter((_, i) => i !== idx);
		}
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
