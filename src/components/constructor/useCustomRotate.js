import throttle from "lodash.throttle";
import React from "react";

const useCustomRotate = (orbitControlsRef) => {
  const [isRotating, setIsRotating] = React.useState(false);
  const [rotatePositions, setRotatePositions] = React.useState({
    x: 0,
    y: 0.3,
  });

  const prevEventClientPositions = React.useRef(null);
  const prevRotatePositions = React.useRef(null);

  const handleMouseDown = (event) => {
    event.button === 0 && setIsRotating(true);
  };

  const handleMouseUp = () => {
    setIsRotating(false);
    prevEventClientPositions.current = null;
  };

  const throttleRotatePosition = React.useMemo(() => {
    return throttle(
      (x, y) =>
        setRotatePositions((p) => {
          const prev = prevRotatePositions.current || p;
          return {
            ...prev,
          };
        }),
      20
    );
  }, []);

  const handleMouseMove = (event) => {
    if (isRotating) {
      const { clientX, clientY } = event;

      if (prevEventClientPositions.current) {
        const currentZoom =
          orbitControlsRef.current?.object.position.z / 1000 || 0.006;
        const zoom =
          currentZoom > 0.006
            ? 0.006
            : currentZoom < 0.001
            ? 0.001
            : currentZoom;

        const x = (clientX - prevEventClientPositions.current.clientX) * zoom;
        const y = (clientY - prevEventClientPositions.current.clientY) * zoom;

        const prev = prevRotatePositions.current || rotatePositions;
        prevRotatePositions.current = {
          x: prev.x + x,
          y: prev.y + y > 1.6 ? 1.6 : prev.y + y <= -1.6 ? -1.6 : prev.y + y,
        };

        throttleRotatePosition(x, y);
        // setRotatePositions((prev) => {
        //   return {
        //     x: prev.x + x,
        //     y: prev.y + y > 1.6 ? 1.6 : prev.y + y <= -1.6 ? -1.6 : prev.y + y,
        //   };
        // });
      }

      prevEventClientPositions.current = { clientX, clientY };
    }
  };

  //   mobile

  const handleTouchMove = (event) => {
    if (event.touches.length === 1) {
      const { clientX, clientY } = event.touches[0];

      if (prevEventClientPositions.current) {
        const zoom = orbitControlsRef.current?.object.position.z / 1000 || 0.01;

        const x = (clientX - prevEventClientPositions.current.clientX) * zoom;
        const y = (clientY - prevEventClientPositions.current.clientY) * zoom;

        setRotatePositions((prev) => {
          return {
            x: prev.x + x,
            y: prev.y + y > 1.6 ? 1.6 : prev.y + y <= -1.6 ? -1.6 : prev.y + y,
          };
        });
      }

      prevEventClientPositions.current = { clientX, clientY };
    }
  };

  const handleTouchEnd = () => {
    prevEventClientPositions.current = null;
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
