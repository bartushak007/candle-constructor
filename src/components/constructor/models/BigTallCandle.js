import Model from "./Model";

const BigTallCandle = (props) => (
  <Model {...props} raiseOn={0.3} model="BigTallModel.gltf" yPosition={0.062} />
);

export default BigTallCandle;
