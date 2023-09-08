import React from "react";
import { Canvas } from "@react-three/fiber";
import "./Constructor.css";
import ResetInitCameraPosition from "./modules/ResetInitCameraPosition";
import ZoomOutCameraPosition from "./modules/ZoomOutCameraPosition";
import AboutSet from "../about-set/AboutSet";
import { paletteColorsByIdDictionary } from "../../constants";
import candles from "./models";
import RotateGroup from "./modules/RotateGroup";
import { isAndroid, record } from "../../helpers";
import Confetti from "./modules/Confetti";
import { useSpring } from "@react-spring/core";
import useInit from "../../hooks/useInit";

const ConstructorPreview = ({ selectedSet, completeCandleConstructor }) => {
  const [isClosing, setIsClosing] = React.useState(false);
  const [isReady, setIsReady] = React.useState(false);
  const [videoUrl, setVideoUrl] = React.useState({
    data: null,
    success: false,
    pending: false,
    failed: false,
  });

  const [resetState, setResetState] = React.useState(false);

  const complete = () => {
    setIsClosing(true);

    setTimeout(() => {
      completeCandleConstructor();
    }, 500);
  };

  const init = useInit();
  const { scale } = useSpring({
    scale: isClosing || init ? 0 : 1 * 1.5,
    config: { duration: 800 },
    onRest() {
      setIsReady(true);
    },
  });

  const canvasRef = React.useRef();
  const recordRef = React.useRef(null);
  React.useEffect(() => {
    if (!recordRef.current && isReady) {
      setVideoUrl({
        data: null,
        success: false,
        pending: true,
        failed: false,
      });
      recordRef.current = record(canvasRef, 8000)
        .then((url) =>
          setVideoUrl({
            data: url,
            success: true,
            pending: false,
            failed: false,
          })
        )
        .catch(() => {
          setVideoUrl({
            data: null,
            success: false,
            pending: false,
            failed: true,
          });
        });
    }
  }, [isReady]);

  return (
    <div className="constructorWrapper">
      <div className="constructorPreviewWrapperCanvasArea">
        <Canvas
          className="constructorPreviewWrapperCanvas"
          dpr={[1, isAndroid() ? 1.5 : 3]}
          ref={canvasRef}
          gl={{ preserveDrawingBuffer: true }}
          style={{ fillStyle: "#87CEEB" }}
          shadows
        >
          <color attach="background" args={["#a8adb3"]} />
          {!isClosing && <Confetti />}
          {resetState && !isClosing && (
            <ResetInitCameraPosition stopReset={() => setResetState(false)} />
          )}
          {isClosing && <ZoomOutCameraPosition />}
          <ambientLight intensity={0.9} />
          <directionalLight position={[1, 3, 4]} castShadow />

          <RotateGroup scale={scale} rotate={isReady}>
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
