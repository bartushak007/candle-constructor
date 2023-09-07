import React from "react";
import { Canvas } from "@react-three/fiber";
import "./Constructor.css";
import Scale from "./modules/Scale";
import ResetInitCameraPosition from "./modules/ResetInitCameraPosition";
import ZoomOutCameraPosition from "./modules/ZoomOutCameraPosition";
import AboutSet from "../about-set/AboutSet";
import { paletteColorsByIdDictionary } from "../../constants";
import ReactConfetti from "react-confetti";
import candles from "./models";
import RotateGroup from "./modules/RotateGroup";
import { isIphone, record } from "../../helpers";

const ConstructorPreview = ({ selectedSet, completeCandleConstructor }) => {
  const [isClosing, setIsClosing] = React.useState(false);
  const [scale, setScale] = React.useState(0.01);
  const [videoUrl, setVideoUrl] = React.useState(false);

  const [resetState, setResetState] = React.useState(false);

  const complete = () => {
    setIsClosing(true);

    setTimeout(() => {
      completeCandleConstructor();
    }, 500);
  };

  const canvasRef = React.useRef();

  const recordRef = React.useRef(null);

  React.useEffect(() => {
    if (recordRef) {
      setTimeout(() => {
        // recordRef.current = record(canvasRef, 8000).then((url) =>
        //   setVideoUrl(url)
        // );
      }, 2000);
    }
  }, []);

  return (
    <div className="constructorWrapper">
      <div className="constructorPreviewWrapperCanvasArea">
        {scale >= 1 && (
          <ReactConfetti className="constructorPreviewWrapperConfetti" />
        )}
        <Canvas
          className="constructorPreviewWrapperCanvas"
          dpr={[1, isIphone() ? 3 : 1.5]}
          ref={canvasRef}
          gl={{ preserveDrawingBuffer: true }}
        >
          {scale !== 1 && <Scale setScale={setScale} scale={scale} />}
          {resetState && !isClosing && (
            <ResetInitCameraPosition stopReset={() => setResetState(false)} />
          )}
          {isClosing && <ZoomOutCameraPosition />}
          <ambientLight intensity={0.9} />
          <directionalLight position={[-2, -2, -2]} />
          <directionalLight position={[2, 2, 2]} />

          <RotateGroup scale={scale * 1.5} rotate={scale >= 1}>
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
        videoUrl={videoUrl}
      />
    </div>
  );
};

export default ConstructorPreview;
