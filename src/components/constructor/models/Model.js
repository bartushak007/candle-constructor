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
  ...props
}) {
  const [animatedPosition, setAnimatedPosition] = React.useState(position);
  const { nodes } = useGLTF("/f16.gltf");
  const geometries = React.useMemo(
    () => Object.values(nodes).filter((node) => node.geometry),
    [nodes]
  );

  useFrame(() => {
    if (isSelected && animatedPosition[1] < 0.5) {
      setAnimatedPosition(([x, y, z]) => [x, y + 0.02, z]);
    }
    if (!isSelected && animatedPosition[1] > 0) {
      setAnimatedPosition(([x, y, z]) => [x, y - 0.02, z]);
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
        <mesh castShadow receiveShadow geometry={node.geometry} key={i}>
          <meshStandardMaterial
            color={color}
            roughness={0.5}
            transparent={true}
            opacity={color === modelColors.initModelColor ? 0.5 : 1}
          />
        </mesh>
      ))}
    </group>
  );
}
