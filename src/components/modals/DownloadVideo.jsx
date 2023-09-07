import React from "react";
import "./modal.css";
import { getAvailableVideoTypesAndCodecs } from "../../helpers";

const Modal = ({ isVisible, closeModal, videoUrl }) => {
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
        <svg
          className="candlesModalClose"
          height="25px"
          id="Layer_1"
          version="1.1"
          viewBox="0 0 512 512"
          width="25px"
          onClick={closeModalWithAnimation}
        >
          <path d="M443.6,387.1L312.4,255.4l131.5-130c5.4-5.4,5.4-14.2,0-19.6l-37.4-37.6c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4  L256,197.8L124.9,68.3c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4L68,105.9c-5.4,5.4-5.4,14.2,0,19.6l131.5,130L68.4,387.1  c-2.6,2.6-4.1,6.1-4.1,9.8c0,3.7,1.4,7.2,4.1,9.8l37.4,37.6c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1L256,313.1l130.7,131.1  c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1l37.4-37.6c2.6-2.6,4.1-6.1,4.1-9.8C447.7,393.2,446.2,389.7,443.6,387.1z" />
        </svg>
        <div
          className={`candlesModalSuccessIcon ${
            !videoUrl.success && "candlesModalSuccessIconPending"
          }`}
        >
          {videoUrl.success && (
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
          )}
        </div>
        <h3 className="candlesModalTitle">
          {!videoUrl.success
            ? "Відео з вашим сетом завантажується"
            : "Натисніть внизу щоб завантажити відео"}
        </h3>
        {!videoUrl.success ? (
          <button
            className="candlesModalBtn"
            onClick={closeModalWithAnimation}
            disabled={!videoUrl.success}
          >
            Завантажити
          </button>
        ) : (
          <a
            className="candlesModalBtn"
            onClick={closeModalWithAnimation}
            href={videoUrl.data}
            download={`candlesSet.${
              getAvailableVideoTypesAndCodecs()?.[0]?.extension
            }`}
          >
            Завантажити
          </a>
        )}
      </div>
    </div>
  );
};

export default Modal;
