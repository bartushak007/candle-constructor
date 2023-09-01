import { useFrame } from "@react-three/fiber";

const Scale = ({ scale, setScale }) => {
  useFrame(() => {
    scale < 1 && setScale(scale + 0.01);
  });

  return null;
};

export default Scale;
