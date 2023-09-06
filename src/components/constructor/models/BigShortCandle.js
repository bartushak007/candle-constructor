import React from "react";
import { useGLTF } from "@react-three/drei";
import { modelColors } from "../../../constants";
import { useFrame } from "@react-three/fiber";

export default function BigShortCandle({
  scale = 1,
  color,
  onClick,
  isSelected,
  position,
  ...props
}) {
  const [animatedPosition, setAnimatedPosition] = React.useState(position);
  const { nodes } = useGLTF(
    process.env.PUBLIC_URL
      ? `${window.location.origin}${process.env.PUBLIC_URL}/BigShort.gltf`
      : "/BigShort.gltf"
  );
  const geometries = React.useMemo(
    () => Object.values(nodes).filter((node) => node.geometry),
    [nodes]
  );

  useFrame(() => {
    if (isSelected && animatedPosition[1] < 1) {
      setAnimatedPosition(([x, y, z]) => [x, y + 0.05, z]);
    }
    if (!isSelected && animatedPosition[1] > 0) {
      setAnimatedPosition(([x, y, z]) => [x, y - 0.05, z]);
    }
  });

  return (
    <group
      position={position}
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
          
          position={animatedPosition}
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
