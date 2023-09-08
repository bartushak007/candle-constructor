import { useFrame } from "@react-three/fiber";
import React from "react";
import { a } from "@react-spring/three";

const AngleGroup = ({ scale, children, isAngle }) => {
  const [angle, setAngle] = React.useState(0.3);

  useFrame(() => {
    if (angle < 0.3 && isAngle) {
      setAngle((a) => a + 0.01);
    }
    if (angle > 0 && !isAngle) {
      setAngle((a) => a - 0.01);
    }
  });

  return (
    <a.group scale={scale} rotation={[angle, 0, 0]}>
      {children}
    </a.group>
  );
};

export default AngleGroup;
