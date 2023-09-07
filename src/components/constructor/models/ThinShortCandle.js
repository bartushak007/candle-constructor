import Model from "./Model";

const ThinShortCandle = (props) => (
  <Model {...props} raiseOn={0.3} model="ThinShortModel.gltf" yPosition={0.628} />
);

export default ThinShortCandle;
