import { observer } from "mobx-react";
import * as React from "react";
import { useStore } from "../../hooks";
import { ArtStore } from "../../store/ArtStore";

import "./Arts.scss";

interface Props {}

const Arts: React.FC<Props> = () => {
  const artStore = useStore(ArtStore);

  return (
    <div className="arts">
      <ol className="arts__list">
        {artStore.arts.map(({ previewUrl, name }, idx) => (
          <li key={idx}>
            <button onClick={() => artStore.deleteArt(idx)}>X</button>
            <img
              // TODO: Remove index as key
              className={`${idx === artStore.activeIdx ? "active" : ""}`}
              onClick={() => artStore.setArt(idx)}
              src={previewUrl}
            />
            <span>{name}</span>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default observer(Arts);
