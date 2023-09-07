import React from "react";
import Model from "./Model";

const ThinTallCandle = (props) => (
  <Model {...props} raiseOn={0.3} model="ThinTall.gltf" yPosition={1.181} />
);

export default ThinTallCandle;
