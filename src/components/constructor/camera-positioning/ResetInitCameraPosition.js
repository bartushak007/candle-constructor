import { useFrame } from "@react-three/fiber";

const ResetInitCameraPosition = ({ stopReset }) => {
  useFrame(({ camera }) => {
    const getPosition = (pX, compare = 0) => {
      const roundX = Math.round(pX * 10) / 10;
      if (roundX > compare) {
        const increaseOn = roundX - compare;
        const burstSpeed = increaseOn > 1 ? increaseOn : 1;

        return pX - 0.05 * burstSpeed;
      }
      if (roundX < compare) {
        const increaseOn = compare - roundX;
        const burstSpeed = increaseOn > 1 ? increaseOn : 1;
        return pX + 0.05 * burstSpeed;
      }

      return compare;
    };

    let x = getPosition(camera.position.x);
    let y = getPosition(camera.position.y);
    let z = getPosition(camera.position.z, 5);

    if (x === 0 && y === 0 && z === 5) {
      stopReset();
    }

    camera.position.set(x, y, z);
  });

  return null;
};

export default ResetInitCameraPosition;
