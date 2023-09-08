import React from "react";
import Model from "./Model";

const ThinTallCandle = (props) => (
  <Model {...props} raiseOn={0.3} model="ThinTallModel.gltf" yPosition={1.17} />
);

export default ThinTallCandle;
