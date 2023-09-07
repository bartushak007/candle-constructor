import React from "react";
import "./aboutSet.css";
import cardSvg from "../../assets/images/card.svg";
import visaSvg from "../../assets/images/visa.svg";
import mastercardSvg from "../../assets/images/mastercard.svg";
import globeSvg from "../../assets/images/globe.svg";
import Accordion from "../accordion";
import Modal from "../modal/Modal";
import { getAvailableVideoTypesAndCodecs } from "../../helpers";

const AboutSet = ({ isClosing, selectedSet, complete, videoUrl }) => {
  const [videoSavedModal, setVideoSavedModal] = React.useState(false);

  const closeModal = () => setVideoSavedModal(false);

  return (
    <>
      <Modal isVisible={videoSavedModal} closeModal={closeModal} />
      <div className={`aboutSet ${isClosing && "aboutSetClosing"}`}>
        <div className="aboutSetHead">
          <h3 className="aboutSetTitle">Твій кастомний сет:</h3>
          <h3 className="aboutSetPrice">$50</h3>
        </div>

        <button className="aboutSetBuyBtn" onClick={complete}>
          ДОДАТИ В КОШИК
        </button>
        <a
          className="aboutSetShareBtn"
          href={videoUrl}
          download={`candlesSet.${
            getAvailableVideoTypesAndCodecs()?.[0]?.extension
          }`}
          onClick={() => setVideoSavedModal(true)}
        >
          Share to Instagram
        </a>

        <div className="aboutSetBox">
          <h4 className="aboutSetYouWillGetTitle">В цьому сеті ти отримаєш:</h4>
          {selectedSet.youWillGet.map((comp) => (
            <div className="aboutSetYouWillGetGoods" key={comp.name}>
              <img
                className="aboutSetYouWillGetPicture"
                src={comp.src}
                alt={comp.name}
              />
              <p className="aboutSetYouWillGetName">{comp.name}</p>
            </div>
          ))}
        </div>

        <div className="aboutSetBox">
          <div className="aboutSetPayWith">
            <img className="aboutSetPayWithMainIcon" src={cardSvg} alt="card" />
            <span>Pay with credit card</span>
            <img src={visaSvg} alt="visa" />
            <img src={mastercardSvg} alt="mastercard" />
          </div>
          <div className="aboutSetPayWith">
            <img
              className="aboutSetPayWithMainIcon"
              style={{ padding: "0 4px" }}
              src={globeSvg}
              alt="globe"
            />
            <span>Worldwide shipping</span>
          </div>
        </div>

        <Accordion aboutProduct={selectedSet.aboutProduct} />
      </div>
    </>
  );
};

export default AboutSet;