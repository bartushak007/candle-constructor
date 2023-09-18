import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import "./Constructor.css";
import ColorsPalette from "../colors-palette";
import { paletteColors, paletteColorsByIdDictionary } from "../../constants";
import { getRandomArrayItem, isAndroid } from "../../helpers";
import ResetInitCameraPosition from "./modules/ResetInitCameraPosition";
import ZoomOutCameraPosition from "./modules/ZoomOutCameraPosition";
import candles from "./models";
import AngleGroup from "./modules/AngleGroup";
import { useSpring } from "@react-spring/core";
import useInit from "../../hooks/useInit";
import RotateIcon from "./modules/rotate-icon/RotateIcon";

const Constructor = ({ selectedSet, saveUserColorsSet }) => {
  const [isInit, setIsInit] = React.useState(true);
  const [wasOrbitControlsClicked, setWasOrbitControlsClicked] = React.useState(false);
  const [wasOrbitControlsChanged, setWasOrbitControlsChanged] =
    React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const [selectedModel, setSelectedModel] = React.useState(null);
  const [models, setModels] = React.useState(selectedSet.models);

  const [resetState, setResetState] = React.useState(false);

  const disableCreate = React.useMemo(
    () => models.some(({ colorId }) => !colorId),
    [models]
  );

  const updateSelectedModel = (id) => {
    isInit && setIsInit(false);
    setSelectedModel(id);
    currentSelectedModelRef.current = id;
  };

  const updateColorOfModel = (colorId) => {
    setModels((models) =>
      models.map((model) =>
        model.id === selectedModel ? { ...model, colorId } : model
      )
    );
  };

  const init = useInit();
  const { scale } = useSpring({
    scale: init ? 0 : 1,
    config: { duration: 800 },
  });

  const updateRandomlyAllModels = () => {
    let colors = [...paletteColors];
    const newModels = models.map((model) => {
      const colorId = getRandomArrayItem(colors)?.id;
      colors = colors.length
        ? colors.filter((c) => c.id !== colorId)
        : { ...paletteColors };
      return {
        ...model,
        colorId: colorId,
      };
    });

    setModels(newModels);
  };

  const updateAllModelsWithColor = (colorId) => {
    if (colorId) {
      setModels((models) =>
        models.map((model) => ({
          ...model,
          colorId: !model.colorId ? colorId : model.colorId,
        }))
      );
      setResetState(true);
    }
  };

  const saveResult = () => {
    saveUserColorsSet({ ...selectedSet, models });
    setIsClosing(true);
  };

  const cameraPositionRef = React.useRef(null);

  const alignOrbit = (e) => {
    const { x, y, z } = e.target?.object?.position;
    const differencePositions = [
      x - cameraPositionRef.current.x,
      y - cameraPositionRef.current.y,
      z - cameraPositionRef.current.z,
    ];
    const compare = (v, a, b) => v > a || v < b;
    if (
      compare(differencePositions[0], 0.1, -0.1) ||
      compare(differencePositions[2], 0.1, -0.1)
    ) {
      setWasOrbitControlsChanged(true);
    }
  };

  React.useEffect(() => {
    if (resetState && !isClosing && wasOrbitControlsChanged) {
      setWasOrbitControlsChanged(false);
    }
  }, [resetState, isClosing, wasOrbitControlsChanged]);

  const lastSelectedModelRef = React.useRef(null);
  const currentSelectedModelRef = React.useRef(null);
  const swipeStartTime = React.useRef(null);
  const resetSelectedModel = () => {
    const currentModel = currentSelectedModelRef.current;
    const lastModel = lastSelectedModelRef.current;

    lastSelectedModelRef.current = currentModel;

    if (
      currentModel === lastModel &&
      new Date().getTime() - swipeStartTime.current < 120
    ) {
      updateSelectedModel(null);
      lastSelectedModelRef.current = null;
      swipeStartTime.current = null;
    }
  };

  return (
    <div className="constructorWrapper">
      {!wasOrbitControlsClicked && <RotateIcon />}
      <Canvas
        className="constructorWrapperCanvas"
        dpr={[1, isAndroid() ? 1.5 : 3]}
        onClick={resetSelectedModel}
        shadows
        onMouseDown={() => {
          swipeStartTime.current = new Date().getTime();
        }}
        
      >
        {resetState && !isClosing && (
          <ResetInitCameraPosition stopReset={() => setResetState(false)} />
        )}
        {isClosing && <ZoomOutCameraPosition />}
        <ambientLight intensity={0.9} />
        <directionalLight position={[-2, -2, -2]} intensity={0.4} />
        <directionalLight position={[1, 3, 4]} castShadow />

        <AngleGroup scale={scale} isAngle={!wasOrbitControlsChanged}>
          {models.map((model) => {
            const Model = candles[model.type];

            return (
              <Model
                key={model.id}
                isSelected={model.id === selectedModel}
                color={paletteColorsByIdDictionary[model.colorId]}
                scale={model.scale}
                position={model.position}
                onClick={(e) => {
                  e.stopPropagation();
                  updateSelectedModel(model.id);
                }}
              />
            );
          })}
        </AngleGroup>

        <OrbitControls
          enablePan={false}
          onStart={(e) => {
            setWasOrbitControlsClicked(true);
            cameraPositionRef.current = { ...e.target?.object?.position };
          }}
          onEnd={alignOrbit}
        />
      </Canvas>

      <ColorsPalette
        isInit={isInit && disableCreate}
        isClosing={isClosing}
        updateColor={updateColorOfModel}
        disableCreate={disableCreate}
        handleRandom={updateRandomlyAllModels}
        handlePaintAll={updateAllModelsWithColor}
        saveResult={saveResult}
        selectedColorId={models?.[selectedModel]?.colorId}
      />
    </div>
  );
};

export default Constructor;
