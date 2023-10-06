import React from "react";
import Model from "./Model";

const ThinVeryTallCandle = (props) => (
  <Model {...props} raiseOn={0.3} model="ThinVeryTallModel.gltf" yPosition={1.17} />
);

export default ThinVeryTallCandle;
