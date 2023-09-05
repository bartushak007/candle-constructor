import React from "react";
import { useFrame } from "@react-three/fiber";

const RotateGroup = ({ scale, children, rotate }) => {
  const groupRef = React.useRef(null);

  useFrame(() => {
    if (groupRef?.current?.rotation && rotate) {
      groupRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group scale={scale} rotation={[0.3, 0, 0]}>
      <group ref={groupRef}>{children}</group>
    </group>
  );
};

export default RotateGroup;
