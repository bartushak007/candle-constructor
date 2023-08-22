import React from "react";
import "./horizontalColors.css";
import { paletteColors } from "../../../constants";

const HorizontalColors = ({ updateColor }) => {
  const ref = React.useRef(null);

  const handleWheel = (e) => {
    if (e.deltaY > 0) ref.current.scrollLeft += 100;
    else ref.current.scrollLeft -= 100;
  };

  return (
    <div className="horizontalColors" ref={ref} onWheel={handleWheel}>
      {paletteColors.map((color) => (
        <div key={color.text} className="horizontalColorsColorWrapper">
          <button
            onClick={() => updateColor(color.color)}
            className="horizontalColorsColorBox"
            id={`horizontalColorsColorBox-${color.text}`}
            style={{ backgroundColor: color.color }}
          />
          <label
            className="horizontalColorsColorText"
            htmlFor={`horizontalColorsColorBox-${color.text}`}
          >
            {color.text}
          </label>
        </div>
      ))}
    </div>
  );
};

export default HorizontalColors;
