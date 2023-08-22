import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Model from "./models/Model";
import "./Constructor.css";
import Scale from "./models/Scale";
import ColorsPalette from "./colors-palette";

// const modelsGroup = [

// ]

const Constructor = () => {
  const [scale, setScale] = React.useState(0.01);

  return (
    <div className="constructorWrapper">
      <Canvas className="constructorWrapperCanvas">
        {scale !== 1 && <Scale setScale={setScale} scale={scale} />}
        <ambientLight intensity={0.9} />
        <directionalLight position={[-2, -2, -2]} />
        <directionalLight position={[2, 2, 2]} />
        <group scale={scale}>
          <Model scale={1} position={[-1, 0, 0]} onClick />
          <Model scale={1} position={[1, 0, 0]} />
        </group>

        <OrbitControls />
      </Canvas>

      <ColorsPalette />
    </div>
  );
};

export default Constructor;
