import React from "react";
import { useGLTF } from "@react-three/drei";
import { modelColors } from "../../../constants";

export default function Model({ scale = 1, color, onClick, ...props }) {
  // const modelRef = React.useRef(null);

  const { nodes } = useGLTF("/f16.gltf");
  const geometries = React.useMemo(
    () => Object.values(nodes).filter((node) => node.geometry),
    [nodes]
  );

  return (
    <group
      // ref={modelRef}
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
