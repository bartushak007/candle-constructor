import React from "react";
import "./colorsPalette.css";
import HorizontalColors from "./horizontal-colors";
import Icon360 from "./icon360";

const ColorsPalette = ({
  isInit,
  isClosing,
  updateColor,
  disableCreate,
  handleRandom,
  handlePaintAll,
  saveResult,
  selectedColorId,
}) => {
  return (
    <div className={`colorsPalette ${isClosing && "colorsPaletteClosing"}`}>
      {isInit && (
        <div className="colorsPaletteEmpty">
          <Icon360 />{" "}
          <div className="colorsPaletteEmptyTitle">
            TAP THE CANDLE. <br /> YOU CAN SPIN AND ZOOM IT.
          </div>
        </div>
      )}
      {!isInit && (
        <div className="colorsPaletteWrapper">
          <div className="colorsPaletteHead">
            <div className="colorsPaletteHeadTitle">CHOOSE THE COLOR:</div>{" "}
            <button className="colorsPaletteRandom" onClick={handleRandom}>
              RANDOM
            </button>
          </div>
          <HorizontalColors
            updateColor={updateColor}
            selectedColorId={selectedColorId}
          />
          <div className="colorsPaletteCreateWrapper">
            <button
              onClick={() =>
                disableCreate ? handlePaintAll(selectedColorId) : saveResult()
              }
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
