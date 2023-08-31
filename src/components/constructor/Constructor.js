import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Model from "./models/Model";
import "./Constructor.css";
import Scale from "./models/Scale";
import ColorsPalette from "./colors-palette";
import { modelColors, paletteColors } from "../../constants";
import { getRandomArrayItem } from "../../helpers";
import ResetInitCameraPosition from "./models/ResetInitCameraPosition";
import ZoomOutCameraPosition from "./models/ZoomOutCameraPosition";

const Constructor = ({ selectedSet, saveUserColorsSet }) => {
  const [isInit, setIsInit] = React.useState(true);
  const [isClosing, setIsClosing] = React.useState(false);
  const [scale, setScale] = React.useState(0.01);

  const [selectedModel, setSelectedModel] = React.useState(null);
  const [models, setModels] = React.useState(selectedSet.models);

  const [resetState, setResetState] = React.useState(false);

  const disableCreate = React.useMemo(
    () => models.some(({ color }) => color === modelColors.initModelColor),
    [models]
  );

  const updateSelectedModel = (id) => {
    isInit && setIsInit(false);
    setSelectedModel(id);
  };

  const updateColorOfModel = (color) => {
    setModels((models) =>
      models.map((model) =>
        model.id === selectedModel ? { ...model, color } : model
      )
    );
  };

  const updateRandomlyAllModels = () => {
    setModels((models) =>
      models.map((model) => ({
        ...model,
        color: getRandomArrayItem(paletteColors).color,
      }))
    );
  };

  const updateAllModelsWithColor = (color = "red") => {
    setModels((models) =>
      models.map((model) => ({
        ...model,
        color: model.color === modelColors.initModelColor ? color : model.color,
      }))
    );
    setResetState(true);
  };

  const saveResult = () => {
    saveUserColorsSet({ ...selectedSet, models });
    setIsClosing(true);
  };

  return (
    <div className="constructorWrapper">
      <Canvas className="constructorWrapperCanvas">
        {scale !== 1 && <Scale setScale={setScale} scale={scale} />}
        {resetState && !isClosing && (
          <ResetInitCameraPosition stopReset={() => setResetState(false)} />
        )}
        {isClosing && <ZoomOutCameraPosition />}
        <ambientLight intensity={0.9} />
        <directionalLight position={[-2, -2, -2]} />
        <directionalLight position={[2, 2, 2]} />

        <group scale={scale}>
          {models.map((model) => (
            <Model
              key={model.id}
              isSelected={model.id === selectedModel}
              color={model.color}
              scale={model.scale}
              position={model.position}
              onClick={() => {
                updateSelectedModel(model.id);
              }}
            />
          ))}
        </group>

        <OrbitControls />
      </Canvas>

      <ColorsPalette
        isInit={isInit && disableCreate}
        isClosing={isClosing}
        updateColor={updateColorOfModel}
        disableCreate={disableCreate}
        handleRandom={updateRandomlyAllModels}
        handlePaintAll={updateAllModelsWithColor}
        saveResult={saveResult}
      />
    </div>
  );
};

export default Constructor;
