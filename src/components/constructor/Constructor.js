import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Model from "./models/Model";
import "./Constructor.css";
import Scale from "./models/Scale";
import ColorsPalette from "./colors-palette";
import { modelColors } from "../../constants";

const modelsGroup = [
  {
    type: "thin1",
    color: modelColors.initModelColor,
    position: [-1, 0, 0],
    id: 0,
  },
  {
    type: "thin1",
    color: modelColors.initModelColor,
    position: [1, 0, 0],
    id: 1,
  },
];

const Constructor = () => {
  const [isInit, setIsInit] = React.useState(true);
  const [scale, setScale] = React.useState(0.01);

  const [selectedModel, setSelectedModel] = React.useState(null);
  const [models, setModels] = React.useState(modelsGroup);

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

  return (
    <div className="constructorWrapper">
      <Canvas className="constructorWrapperCanvas">
        {scale !== 1 && <Scale setScale={setScale} scale={scale} />}
        <ambientLight intensity={0.9} />
        <directionalLight position={[-2, -2, -2]} />
        <directionalLight position={[2, 2, 2]} />

        <group scale={scale}>
          {models.map((model) => (
            <Model
              key={model.id}
              color={model.color}
              scale={1}
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
        isInit={isInit}
        updateColor={updateColorOfModel}
        disableCreate={disableCreate}
      />
    </div>
  );
};

export default Constructor;
