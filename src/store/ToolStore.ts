import { observable, action } from "mobx";
import { Tool } from "../types";
import { pencil, bucket } from "../tools";
import { Service } from "typedi";

@Service()
export class ToolStore {
  @observable tools: Tool[] = [pencil, bucket];
  @observable selectedTool: Tool = this.tools[0];

  // @computed
  // get SelectedTool() {
  // 	return this.selectedTool;
  // }

  @action
  select(idx: number) {
    if (this.tools[idx]) {
      this.selectedTool = this.tools[idx];
    }
  }
}
