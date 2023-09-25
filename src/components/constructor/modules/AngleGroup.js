import React from "react";
import { a } from "@react-spring/three";

const AngleGroup = ({ scale, children, rotatePositions }) => {
  return (
    <a.group scale={scale} rotation={[rotatePositions.y, rotatePositions.x, 0]}>
      {children}
    </a.group>
  );
};

export default AngleGroup;
