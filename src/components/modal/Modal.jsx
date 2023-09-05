import React from "react";
import "./modal.css";

const Modal = ({ isVisible, closeModal }) => {
  const [isClosing, setIsClosing] = React.useState(false);

  if (!isVisible) {
    return null;
  }

  const closeModalWithAnimation = () => {
    setIsClosing(true);

    setTimeout(() => {
      closeModal();
      setIsClosing(false);
    }, 500);
  };

  return (
    <div
      className={`candlesModalOverlay ${
        isClosing && "candlesModalOverlayClosing"
      }`}
    >
      <div className="candlesModal">
        <div className="candlesModalSuccessIcon">
          <svg
            width="60"
            height="40"
            viewBox="0 0 60 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 17.5L23 37.5L57.5 3"
              stroke="black"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h3 className="candlesModalTitle">
          Відео з вашим сетом збережено в галерею
        </h3>
        <button className="aboutSetBuyBtn" onClick={closeModalWithAnimation}>
          OK
        </button>
      </div>
    </div>
  );
};

export default Modal;
