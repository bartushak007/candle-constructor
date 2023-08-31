import React from "react";
import "./colorsPalette.css";
import HorizontalColors from "./horizontal-colors";

const ColorsPalette = ({
  isInit,
  isClosing,
  updateColor,
  disableCreate,
  handleRandom,
  handlePaintAll,
  saveResult,
}) => {
  return (
    <div className={`colorsPalette ${isClosing && "colorsPaletteClosing"}`}>
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
            <button
              onClick={() => (disableCreate ? handlePaintAll() : saveResult())}
              className={`colorsPaletteCreateBtn ${
                disableCreate && "colorsPaletteCreateBtnDisabled"
              }`}
            >
              СТВОРИТИ
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorsPalette;
