import * as React from "react";
import { Canvas, Arts, Pallete, ToolRack, Controls } from "./components";

import "./App.scss";

interface Props {}

const App: React.FC<Props> = () => {
  return (
    <div className="outer">
      <Controls />
      <div className="inner">
        <div className="tools">
          <ToolRack />
          <Pallete />
        </div>
        <Canvas />
        <Arts />
      </div>
    </div>
  );
};

export default App;
