import React from "react";
import { useFrame } from "@react-three/fiber";
import { a } from "@react-spring/three";

const RotateGroup = ({ scale, children, rotate }) => {
  const groupRef = React.useRef(null);

  useFrame((state, delta) => {
    if (groupRef?.current?.rotation && rotate) {
      groupRef.current.rotation.y += delta;
    }
  });

  return (
    <a.group scale={scale} rotation={[0.3, 0, 0]}>
      <group ref={groupRef}>{children}</group>
    </a.group>
  );
};

export default RotateGroup;
