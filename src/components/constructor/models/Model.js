import React from "react";
import { useGLTF } from "@react-three/drei";
import { modelColors } from "../../../constants";
import { useFrame } from "@react-three/fiber";

export default function Model({
  scale = 1,
  color,
  onClick,
  isSelected,
  position,
  model,
  raiseOn,
  yPosition = 0,
  ...props
}) {
  const originPOsition = React.useMemo(() => [
    position[0],
    position[1] + yPosition,
    position[2],
  ]);

  const [animatedPosition, setAnimatedPosition] = React.useState(originPOsition);
  const { nodes } = useGLTF(
    process.env.PUBLIC_URL
      ? `${window.location.origin}${process.env.PUBLIC_URL}/${model}`
      : `/${model}`
  );
  const geometries = React.useMemo(
    () => Object.values(nodes).filter((node) => node.geometry),
    [nodes]
  );

  const positionYOrigin = originPOsition[1];
  const selectedPositionY = positionYOrigin + raiseOn;

  useFrame(() => {
    if (isSelected && animatedPosition[1] < selectedPositionY) {
      setAnimatedPosition(([x, y, z]) => [x, y + 0.05, z]);
    }
    if (!isSelected && animatedPosition[1] > positionYOrigin) {
      setAnimatedPosition(([x, y, z]) => [x, y - 0.05, z]);
    }
  });

  return (
    <group
      position={animatedPosition}
      {...props}
      dispose={null}
      scale={scale * 0.18}
      onClick={onClick}
    >
      {geometries.map((node, i) => (
        <mesh
          castShadow
          receiveShadow
          geometry={node.geometry}
          key={i}
          position={originPOsition}
        >
          <meshStandardMaterial
            color={color || modelColors.initModelColor}
            roughness={0.5}
            transparent={true}
            opacity={!color ? 0.5 : 1}
          />
        </mesh>
      ))}
    </group>
  );
}
