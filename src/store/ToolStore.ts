import { observable, action } from 'mobx';
import { Tool } from '../types';
import { pencil } from '../tools';

export class ToolStore {
	@observable tools: Tool[] = [pencil];
	@observable selectedTool: Tool = this.tools[0];

	@action
	select(idx: number) {
		if (this.tools[idx]) {
			this.selectedTool = this.tools[idx];
		}
	}
}
