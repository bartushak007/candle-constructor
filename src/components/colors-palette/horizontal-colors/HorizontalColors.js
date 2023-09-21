import React from "react";
import "./horizontalColors.css";
import { paletteColors } from "../../../constants";

const HorizontalColors = ({ updateColor, selectedColorId }) => {
  const ref = React.useRef(null);

  const handleWheel = (e) => {
    if (e.deltaY > 0) ref.current.scrollLeft += 100;
    else ref.current.scrollLeft -= 100;
  };

  return (
    <div className="horizontalColorsMain">
      <div className="horizontalColors" ref={ref} onWheel={handleWheel}>
        {paletteColors.map((color) => (
          <div key={color.text} className="horizontalColorsColorWrapper">
            <button
              onClick={() => updateColor(color.id)}
              className="horizontalColorsColorBox"
              id={`horizontalColorsColorBox-${color.id}`}
              style={{
                backgroundImage: `url(${color.cover})`,
                border: selectedColorId === color.id ? "1px solid #000" : "0",
              }}
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
    </div>
  );
};

export default HorizontalColors;
