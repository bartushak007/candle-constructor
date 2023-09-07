import React from "react";
import { useFrame } from "@react-three/fiber";

const RotateGroup = ({ scale, children, rotate }) => {
  const groupRef = React.useRef(null);

  useFrame((state, delta) => {
    if (groupRef?.current?.rotation && rotate) {
      groupRef.current.rotation.y += delta;
    }
  });

  return (
    <group scale={scale} rotation={[0.3, 0, 0]}>
      <group ref={groupRef}>{children}</group>
    </group>
  );
};

export default RotateGroup;
