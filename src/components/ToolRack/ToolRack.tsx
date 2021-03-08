import { observer } from "mobx-react";
import * as React from "react";
import { useStore } from "../../hooks";
import { ToolStore } from "../../store/ToolStore";

import "./ToolRack.scss";

interface Props {}

const ToolRack: React.FC<Props> = () => {
  const toolStore = useStore(ToolStore);

  return (
    <div className="toolrack">
      {toolStore.tools.map(({ name }, idx) => (
        <div
          className={`toolrack__tool ${
            toolStore.selectedTool.name === name ? "active" : ""
          }`}
          key={name}
          onClick={() => toolStore.select(idx)}
        >
          <h1>{name.charAt(0)}</h1>
        </div>
      ))}
    </div>
  );
};

export default observer(ToolRack);
