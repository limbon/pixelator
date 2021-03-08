import { MobXProviderContext } from "mobx-react";
import { useContext } from "react";
import { Type } from "../types";

export default <TStore>(store: Type<TStore>) => {
  const stores = useContext(MobXProviderContext);
  return stores[store.name] as TStore;
};
