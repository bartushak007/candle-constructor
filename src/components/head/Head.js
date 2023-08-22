import React from "react";
import './head.css';

function Head({ setStep, step }) {
  const goBack = () => setStep((step) => step - 1);

  return (
    <div className="constructorHead">
      <button
        disabled={step < 1}
        className="constructorHead__backBtn"
        onClick={goBack}
      >
        <svg
          width="13"
          height="22"
          viewBox="0 0 13 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 1L2 11L12 21" stroke="black" strokeWidth="2" />
        </svg>
      </button>
      <button
        className={`constructorHead__btn ${
          step === 0 ? "constructorHead__btn--selected" : ""
        }`}
        onClick={() => step > 0 && setStep(0)}
      >
        1
      </button>
      <button
        className={`constructorHead__btn ${
          step === 1 ? "constructorHead__btn--selected" : ""
        }`}
        onClick={() => step > 1 && setStep(1)}
      >
        2
      </button>
      <button
        className={`constructorHead__btn ${
          step === 2 ? "constructorHead__btn--selected" : ""
        }`}
      >
        3
      </button>
    </div>
  );
}

export default Head;
