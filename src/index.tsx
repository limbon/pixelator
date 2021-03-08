import "mobx-react-lite/batchingForReactDom";
import "reflect-metadata";

import * as React from "react";
import * as ReactDOM from "react-dom";

import { Provider } from "./utils/mobxUtils";

import { ToolStore } from "./store/ToolStore";
import { CanvasStore } from "./store/CanvasStore";
import { PalleteStore } from "./store/PalleteStore";
import { ArtStore } from "./store/ArtStore";

import "./index.scss";

import App from "./App";

ReactDOM.render(
  <Provider stores={[ToolStore, CanvasStore, PalleteStore, ArtStore]}>
    <App />
  </Provider>,
  document.querySelector(".root")
);
