import React from "react";
import { Canvas } from "@react-three/fiber";
import Model from "./models/Model";
import "./Constructor.css";
import Scale from "./models/Scale";
import ResetInitCameraPosition from "./models/ResetInitCameraPosition";
import ZoomOutCameraPosition from "./models/ZoomOutCameraPosition";

const ConstructorPreview = ({ selectedSet }) => {
  const [isClosing, setIsClosing] = React.useState(false);
  const [scale, setScale] = React.useState(0.01);

  const [resetState, setResetState] = React.useState(false);

  return (
    <div className="constructorWrapper">
      <Canvas className="constructorPreviewWrapperCanvas">
        {scale !== 1 && <Scale setScale={setScale} scale={scale} />}
        {resetState && !isClosing && (
          <ResetInitCameraPosition stopReset={() => setResetState(false)} />
        )}
        {isClosing && <ZoomOutCameraPosition />}
        <ambientLight intensity={0.9} />
        <directionalLight position={[-2, -2, -2]} />
        <directionalLight position={[2, 2, 2]} />

        <group scale={scale}>
          {selectedSet.models.map((model) => (
            <Model
              key={model.id}
              color={model.color}
              scale={model.scale}
              position={model.position}
            />
          ))}
        </group>

        
      </Canvas>
    </div>
  );
};

export default ConstructorPreview;
