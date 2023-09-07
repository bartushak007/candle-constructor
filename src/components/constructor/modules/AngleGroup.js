import { useFrame } from "@react-three/fiber";
import React from "react";

const AngleGroup = ({ scale, children, isAngle }) => {
  const [angle, setAngle] = React.useState(0);

  // useFrame(() => {
  //   if (angle < 0.3 && isAngle) {
  //     setAngle((a) => a + 0.01);
  //   }
  //   if (angle > 0 && !isAngle) {
  //     setAngle((a) => a - 0.01);
  //   }
  // });

  return (
    <group scale={scale} rotation={[angle, 0, 0]}>
      {children}
    </group>
  );
};

export default AngleGroup;
