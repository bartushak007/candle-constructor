import React from "react";

const useCustomRotate = () => {
  const [isRotating, setIsRotating] = React.useState(false);
  const [rotatePositions, setRotatePositions] = React.useState({ x: 0, y: 60 });

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
        const x = clientX - prevRotatePositions.current.clientX;
        const y = clientY - prevRotatePositions.current.clientY;

        setRotatePositions((prev) => {
          return {
            x: prev.x + x,
            y: prev.y + y > 330 ? 330 : prev.y + y <= -330 ? -330 : prev.y + y,
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
        const x = clientX - prevRotatePositions.current.clientX;
        const y = clientY - prevRotatePositions.current.clientY;

        setRotatePositions((prev) => {
          return {
            x: prev.x + x,
            y: prev.y + y > 330 ? 330 : prev.y + y <= -330 ? -330 : prev.y + y,
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
