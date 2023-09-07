import { MathUtils } from "three";
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Instances, Instance } from "@react-three/drei";
import { isAndroid } from "../../../helpers";

const particles = Array.from({ length: isAndroid() ? 25 : 50 }, () => ({
  factor: MathUtils.randInt(20, 100),
  speed: MathUtils.randFloat(0.01, 0.75),
  xFactor: MathUtils.randFloatSpread(40),
  yFactor: MathUtils.randFloatSpread(10),
  zFactor: MathUtils.randFloatSpread(10),
  scale: getRandomNumber(),
  color: getRandomColor(),
}));

function Bubble({ factor, speed, xFactor, yFactor, scale, color }) {
  const ref = useRef();

  useFrame((state) => {
    const t = factor + state.clock.elapsedTime * speed;

    ref.current.position.set(
      Math.cos(t) +
        Math.sin(t * 1) / 10 +
        xFactor +
        Math.cos((t / 10) * factor) +
        (Math.sin(t * 1) * factor) / 10,
      Math.sin(t) +
        Math.cos(t * 2) / 10 +
        yFactor +
        Math.sin((t / 10) * factor) +
        (Math.cos(t * 2) * factor) / 10,
      -10
    );
  });

  return <Instance ref={ref} scale={scale} color={color} />;
}

function Bubbles() {
  const ref = useRef();

  const [scale, setScale] = React.useState(0);

  useFrame(() => {
    scale < 1 && setScale(scale + 0.01);
  });

  return (
    <Instances
      limit={particles.length}
      ref={ref}
      castShadow
      receiveShadow
      scale={scale}
    >
      <circleGeometry args={[0.45, 20, 20]} />
      <meshStandardMaterial roughness={1} />
      {particles.map((data, i) => (
        <Bubble key={i} {...data} />
      ))}
    </Instances>
  );
}

function getRandomNumber() {
  return Math.random() * 2 + 1;
}

function getRandomColor() {
  const colorArray = ["#FFD1DC", "#87CEEB", "#FFFF99", "#E6E6FA", "#98FB98"];
  const randomIndex = Math.floor(Math.random() * colorArray.length);
  return colorArray[randomIndex];
}

export default Bubbles;
