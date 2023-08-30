import React from "react";
import "./selectSet.css";

function SelectSet({ candleSets, selectNewSet, selectedSetId }) {
  return (
    <div className="constructorSelectSet">
      {candleSets.map((candle) => (
        <div
          className={`constructorSetItem ${
            selectedSetId === candle.id && 'constructorSetItemSelected'
          }`}
          key={candle.id}
          onClick={() => selectNewSet(candle.id)}
        >
          <div className="constructorSetItemCoverBox">
            <img
              className="constructorSetCover"
              alt={candle.name}
              src={candle.coverSrc}
            />
          </div>
          <div className="constructorSetCoverTitle">
            {candle.name}{" "}
            {candle.decoratedText && (
              <span className="constructorSetCoverTitleHighlight">
                {candle.decoratedText}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default SelectSet;
