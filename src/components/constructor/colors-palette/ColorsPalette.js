import React from "react";
import "./colorsPalette.css";
import HorizontalColors from "../horizontal-colors";

const ColorsPalette = ({ isInit, updateColor, disableCreate }) => {
  return (
    <div className="colorsPalette">
      {isInit && <div className="colorsPaletteEmptyTitle">TAP THE CANDLE</div>}
      {!isInit && (
        <div className="colorsPaletteWrapper">
          <div className="colorsPaletteHead">
            CHOOSE THE COLOR:{" "}
            <button className="colorsPaletteRandom">RANDOM</button>
          </div>
          <HorizontalColors updateColor={updateColor} />
          <div className="colorsPaletteCreateWrapper">
            <button disabled={disableCreate} className="colorsPaletteCreateBtn">
              СТВОРИТИ
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorsPalette;
