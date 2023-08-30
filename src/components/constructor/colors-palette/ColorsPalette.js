import React from "react";
import "./colorsPalette.css";
import HorizontalColors from "../horizontal-colors";

const ColorsPalette = ({
  isInit,
  updateColor,
  disableCreate,
  handleRandom,
  handlePaintAll,
}) => {
  return (
    <div className="colorsPalette">
      {isInit && <div className="colorsPaletteEmptyTitle">TAP THE CANDLE</div>}
      {!isInit && (
        <div className="colorsPaletteWrapper">
          <div className="colorsPaletteHead">
            CHOOSE THE COLOR:{" "}
            <button className="colorsPaletteRandom" onClick={handleRandom}>
              RANDOM
            </button>
          </div>
          <HorizontalColors updateColor={updateColor} />
          <div className="colorsPaletteCreateWrapper">
          {/* disabled={disableCreate} */}
            <button  onClick={() => handlePaintAll()} className="colorsPaletteCreateBtn"> 
              СТВОРИТИ
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorsPalette;
