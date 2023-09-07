import React from "react";
import Model from "./Model";

const ThinTallCandle = (props) => (
  <Model {...props} raiseOn={0.5} model="ThinTall.gltf" />
);

export default ThinTallCandle;
