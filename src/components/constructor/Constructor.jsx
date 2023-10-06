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
import useCustomRotate from "./useCustomRotate";

const Constructor = ({ selectedSet, saveUserColorsSet }) => {
  const [isInit, setIsInit] = React.useState(true);
  const [wereOrbitControlsClicked, setWereOrbitControlsClicked] =
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

      colors = colors.filter((c) => c.id !== colorId);

      if (!colors.length) {
        colors = [...paletteColors];
      }

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

  const orbitControlsRef = React.useRef();
  const customRotate = useCustomRotate(orbitControlsRef, selectedSet.startAngle);

  return (
    <div className="constructorWrapper">
      {!wereOrbitControlsClicked && <RotateIcon />}
      <Canvas
        className="constructorWrapperCanvas"
        dpr={[1, isAndroid() ? 1.5 : 3]}
        onClick={resetSelectedModel}
        shadows
        onMouseDown={(e) => {
          swipeStartTime.current = new Date().getTime();
          customRotate.handleMouseDown(e);
          !wereOrbitControlsClicked && setWereOrbitControlsClicked(true);
        }}
        onMouseMove={customRotate.handleMouseMove}
        onMouseUp={customRotate.handleMouseUp}
        onMouseOut={customRotate.handleMouseUp}

        onTouchStart={() => {
          !wereOrbitControlsClicked && setWereOrbitControlsClicked(true);
        }}
        onTouchMove={customRotate.handleTouchMove}
        onTouchEnd={customRotate.handleTouchEnd}
      >
        {resetState && !isClosing && (
          <ResetInitCameraPosition
            stopReset={() => setResetState(false)}
            orbitControlsRef={orbitControlsRef}
            rotatePositions={customRotate.rotatePositions}
            setRotatePositions={customRotate.setRotatePositions}
          />
        )}
        {isClosing && <ZoomOutCameraPosition />}
        <ambientLight intensity={0.9} />
        <directionalLight position={[-2, -2, -2]} intensity={0.4} />
        <directionalLight position={[0, 0, 400]} intensity={1} castShadow />

        <AngleGroup
          scale={scale}
          rotatePositions={customRotate.rotatePositions}
          orbitControlsRef={orbitControlsRef}
        >
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

        <OrbitControls enableRotate={false} ref={orbitControlsRef} e />
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
