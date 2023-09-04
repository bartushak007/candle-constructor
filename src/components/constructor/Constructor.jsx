import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import "./Constructor.css";
import Scale from "./modules/Scale";
import ColorsPalette from "../colors-palette";
import { paletteColors, paletteColorsByIdDictionary } from "../../constants";
import { getRandomArrayItem } from "../../helpers";
import ResetInitCameraPosition from "./modules/ResetInitCameraPosition";
import ZoomOutCameraPosition from "./modules/ZoomOutCameraPosition";
import candles from "./models";

const Constructor = ({ selectedSet, saveUserColorsSet }) => {
  const [isInit, setIsInit] = React.useState(true);
  const [isClosing, setIsClosing] = React.useState(false);
  const [scale, setScale] = React.useState(0.01);

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
  };

  const updateColorOfModel = (colorId) => {
    setModels((models) =>
      models.map((model) =>
        model.id === selectedModel ? { ...model, colorId } : model
      )
    );
  };

  const updateRandomlyAllModels = () => {
    setModels((models) =>
      models.map((model) => ({
        ...model,
        colorId: getRandomArrayItem(paletteColors).id,
      }))
    );
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

  return (
    <div className="constructorWrapper">
      <Canvas className="constructorWrapperCanvas" dpr={[1, 4]}>
        {scale !== 1 && <Scale setScale={setScale} scale={scale} />}
        {resetState && !isClosing && (
          <ResetInitCameraPosition stopReset={() => setResetState(false)} />
        )}
        {isClosing && <ZoomOutCameraPosition />}
        <ambientLight intensity={0.9} />
        <directionalLight position={[-2, -2, -2]} />
        <directionalLight position={[2, 2, 2]} />

        <group scale={scale} rotation={[0.3, 0, 0]}>
          {models.map((model) => {
            const Model = candles[model.type];

            return (
              <Model
                key={model.id}
                isSelected={model.id === selectedModel}
                color={paletteColorsByIdDictionary[model.colorId]}
                scale={model.scale}
                position={model.position}
                onClick={() => {
                  updateSelectedModel(model.id);
                }}
              />
            );
          })}
        </group>

        <OrbitControls enablePan={false} />
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
