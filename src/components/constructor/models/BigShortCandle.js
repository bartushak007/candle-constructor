import Model from "./Model";

const BigShortCandle = (props) => (
  <Model {...props} raiseOn={0.3} model="BigShortModel.gltf" yPosition={-0.273} />
);

export default BigShortCandle;
