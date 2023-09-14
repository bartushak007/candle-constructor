import React from "react";
import { useGLTF } from "@react-three/drei";
import { modelColors } from "../../../constants";
import { a } from "@react-spring/three";
import { useSpring } from "@react-spring/core";

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
  const originPosition = React.useMemo(
    () => [position[0], position[1] + yPosition - 0.4, position[2]],
    [position, yPosition]
  );

  const { nodes } = useGLTF(
    process.env.PUBLIC_URL
      ? `${window.location.origin}${process.env.PUBLIC_URL}/${model}`
      : `/${model}`
  );
  const geometries = React.useMemo(
    () => Object.values(nodes).filter((node) => node.geometry),
    [nodes]
  );

  const selectedPositionY = originPosition[1] + raiseOn;

  const { positionY } = useSpring({
    positionY: isSelected ? selectedPositionY : originPosition[1],
    config: { mass: 2, tension: 300, friction: 25, precision: 0.0001 },
  });

  return (
    <a.group
      {...props}
      position-x={originPosition[0]}
      position-y={positionY}
      position-z={originPosition[2]}
      scale={scale * 0.18}
      onClick={onClick}
    >
      {geometries.map((node, i) => (
        <mesh
          castShadow
          receiveShadow
          geometry={node.geometry}
          key={i}
          position={originPosition}
        >
          <meshStandardMaterial
            color={color || modelColors.initModelColor}
            roughness={0.6}
            transparent={true}
            opacity={!color ? 0.7 : 1}
          />
        </mesh>
      ))}
    </a.group>
  );
}
