import * as React from "react";
import { Provider as MobxProvider } from "mobx-react";
import { Container } from "typedi";

import { Type } from "../types";

export const Provider: React.FC<{ stores?: Type<any>[] }> = ({
  stores,
  children,
}) => {
  const storeMap = React.useMemo(
    () =>
      stores?.reduce(
        (acc, store) => ({ ...acc, [store.name]: Container.get(store) }),
        {}
      ),
    []
  );

  return <MobxProvider {...storeMap}>{children}</MobxProvider>;
};
