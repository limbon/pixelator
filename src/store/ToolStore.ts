import { observable, action } from 'mobx';
import { Tool } from '../types';
import { pencil, bucket } from '../tools';

export class ToolStore {
	@observable tools: Tool[] = [pencil, bucket];
	@observable selectedTool: Tool = this.tools[0];

	@action
	select(idx: number) {
		if (this.tools[idx]) {
			this.selectedTool = this.tools[idx];
		}
	}
}
