import React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import "./Constructor.css";
import Scale from "./modules/Scale";
import ResetInitCameraPosition from "./modules/ResetInitCameraPosition";
import ZoomOutCameraPosition from "./modules/ZoomOutCameraPosition";
import AboutSet from "../about-set/AboutSet";
import { paletteColorsByIdDictionary } from "../../constants";
import ReactConfetti from "react-confetti";
import candles from "./models";
import RotateGroup from "./models/RotateGroup";

const ConstructorPreview = ({ selectedSet, completeCandleConstructor }) => {
  const [isClosing, setIsClosing] = React.useState(false);
  const [scale, setScale] = React.useState(0.01);

  const [resetState, setResetState] = React.useState(false);

  const complete = () => {
    setIsClosing(true);

    setTimeout(() => {
      completeCandleConstructor();
    }, 500);
  };



  return (
    <div className="constructorWrapper">
      <div className="constructorPreviewWrapperCanvasArea">
        <ReactConfetti className="constructorPreviewWrapperConfetti" />
        <Canvas className="constructorPreviewWrapperCanvas" dpr={[1, 4]}>
          {scale !== 1 && <Scale setScale={setScale} scale={scale} />}
          {resetState && !isClosing && (
            <ResetInitCameraPosition stopReset={() => setResetState(false)} />
          )}
          {isClosing && <ZoomOutCameraPosition />}
          <ambientLight intensity={0.9} />
          <directionalLight position={[-2, -2, -2]} />
          <directionalLight position={[2, 2, 2]} />

          <RotateGroup scale={scale * 1.5} >
            {selectedSet.models.map((model) => {
              const Model = candles[model.type];

              return (
                <Model
                  key={model.id}
                  color={paletteColorsByIdDictionary[model.colorId]}
                  scale={model.scale}
                  position={model.position}
                />
              );
            })}
          </RotateGroup>
        </Canvas>
      </div>
      <AboutSet
        selectedSet={selectedSet}
        isClosing={isClosing}
        complete={complete}
      />
    </div>
  );
};

export default ConstructorPreview;
