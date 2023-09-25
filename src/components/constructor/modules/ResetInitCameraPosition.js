import { useFrame } from "@react-three/fiber";

const ResetInitCameraPosition = ({
  stopReset,
  orbitControlsRef,
  rotatePositions,
  setRotatePositions,
}) => {
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

    let rotatePositionX = getPosition(rotatePositions.x);
    let rotatePositionY = getPosition(rotatePositions.y, 0.3);

    let positionZ = getPosition(camera.position.z, 5);

    const target = orbitControlsRef.current?.target;

    let panX = getPosition(target.x ?? 0);
    let panY = getPosition(target.y ?? 0);
    let panZ = getPosition(target.z ?? 0);

    if (
      rotatePositionX === 0 &&
      rotatePositionY === 0.3 &&
      positionZ === 5 &&
      panX === 0 &&
      panY === 0 &&
      panZ === 0
    ) {
      stopReset();
    }

    camera.position.set(0, 0, positionZ);
    orbitControlsRef.current?.target.set(panX, panY, panZ);
    setRotatePositions({ x: rotatePositionX, y: rotatePositionY });
  });

  return null;
};

export default ResetInitCameraPosition;
