import React from "react";

const useCustomRotate = (orbitControlsRef) => {
  const [isRotating, setIsRotating] = React.useState(false);
  const [rotatePositions, setRotatePositions] = React.useState({
    x: 0,
    y: 0.3,
  });

  const prevRotatePositions = React.useRef(null);

  const handleMouseDown = (event) => {
    event.button === 0 && setIsRotating(true);
  };

  const handleMouseUp = () => {
    setIsRotating(false);
    prevRotatePositions.current = null;
  };

  const handleMouseMove = (event) => {
    if (isRotating) {
      const { clientX, clientY } = event;

      if (prevRotatePositions.current) {
        const currentZoom =
          orbitControlsRef.current?.object.position.z / 1000 || 0.006;
        const zoom = currentZoom > 0.006 ? 0.006 : currentZoom < 0.001 ? 0.001 : currentZoom;

        const x = (clientX - prevRotatePositions.current.clientX) * zoom;
        const y = (clientY - prevRotatePositions.current.clientY) * zoom;

        setRotatePositions((prev) => {
          return {
            x: prev.x + x,
            y: prev.y + y > 1.6 ? 1.6 : prev.y + y <= -1.6 ? -1.6 : prev.y + y,
          };
        });
      }

      prevRotatePositions.current = { clientX, clientY };
    }
  };

  //   mobile

  const handleTouchMove = (event) => {
    if (event.touches.length === 1) {
      const { clientX, clientY } = event.touches[0];

      if (prevRotatePositions.current) {
        const zoom = orbitControlsRef.current?.object.position.z / 1000 || 0.01;

        const x = (clientX - prevRotatePositions.current.clientX) * zoom;
        const y = (clientY - prevRotatePositions.current.clientY) * zoom;

        setRotatePositions((prev) => {
          return {
            x: prev.x + x,
            y: prev.y + y > 1.6 ? 1.6 : prev.y + y <= -1.6 ? -1.6 : prev.y + y,
          };
        });
      }

      prevRotatePositions.current = { clientX, clientY };
    }
  };

  const handleTouchEnd = () => {
    prevRotatePositions.current = null;
  };

  return {
    handleMouseDown,
    handleMouseUp,
    handleMouseMove,

    handleTouchMove,
    handleTouchEnd,

    rotatePositions,
    setRotatePositions,
  };
};

export default useCustomRotate;
