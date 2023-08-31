import { useFrame } from "@react-three/fiber";

const ZoomOutCameraPosition = () => {
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

    const x = getPosition(camera.position.x);
    const y = getPosition(camera.position.y);
    const z = getPosition(camera.position.z, 100);

    camera.position.set(x, y, z);
  });

  return null;
};

export default ZoomOutCameraPosition;
