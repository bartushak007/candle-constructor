import React from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export default function Model({ scale = 1, ...props }) {
  const modelRef = React.useRef(null);

  const { nodes } = useGLTF("/f16.gltf");
  const geometries = React.useMemo(
    () => Object.values(nodes).filter((node) => node.geometry),
    [nodes]
  );

  return (
    <group ref={modelRef} {...props} dispose={null} scale={scale * 0.18}>
      {geometries.map((node, i) => (
        <mesh castShadow receiveShadow geometry={node.geometry} key={i}>
          <meshStandardMaterial
            color={"red"}
            roughness={0.5}
            transparent={true}
            // opacity={0.5}
          />
        </mesh>
      ))}
    </group>
  );
}
