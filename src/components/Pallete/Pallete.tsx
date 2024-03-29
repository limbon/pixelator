import * as React from "react";

import SwitchColor from "./arrow.svg";

import "./Pallete.scss";
import { rgbToHex } from "../../utils/rgbToHex";
import { hexToRgb } from "../../utils/hexToRgb";
import { useStore } from "../../hooks";
import { PalleteStore } from "../../store/PalleteStore";
import { observer } from "mobx-react";

interface Props {}

const Pallete: React.FC<Props> = () => {
  const pColorRef = React.useRef<HTMLInputElement>(null);
  const sColorRef = React.useRef<HTMLInputElement>(null);

  const palleteStore = useStore(PalleteStore);

  const swapColors = React.useCallback(() => {
    if (pColorRef.current && sColorRef.current) {
      // TODO: Is there another way to deal with it?
      palleteStore.swapColors();
      pColorRef.current.value = rgbToHex(palleteStore.primaryColor);
      sColorRef.current.value = rgbToHex(palleteStore.secondaryColor);
    }
  }, [pColorRef.current, sColorRef.current]);

  return (
    <div className="pallete__container">
      <button onClick={swapColors}>
        <SwitchColor width="32px" height="32px" viewBox="0 0 250 250" />
      </button>
      <div className="pallete">
        <div className={`pallete__color`}>
          <input
            type="color"
            ref={pColorRef}
            onChange={(evt) =>
              palleteStore.setPrimaryColor(hexToRgb(`${evt.target.value}ff`))
            }
            defaultValue={rgbToHex(palleteStore.primaryColor)}
          />
        </div>
        <div className={`pallete__color`}>
          <input
            type="color"
            ref={sColorRef}
            onChange={(evt) =>
              palleteStore.setSecondaryColor(hexToRgb(`${evt.target.value}ff`))
            }
            defaultValue={rgbToHex(palleteStore.secondaryColor)}
          />
        </div>
      </div>
    </div>
  );
};

export default observer(Pallete);
