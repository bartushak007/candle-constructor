import React from "react";
import "./candleConstructor.css";
import Head from "./components/head/Head";
import SelectSet from "./components/select-set/SelectSet";
import { candleSets } from "./assets/data";
import Constructor from "./components/constructor/Constructor";
import ConstructorPreview from "./components/constructor/ConstructorPreview";

function CandleConstructor() {
  const [step, setStep] = React.useState(0);
  const [selectedSetId, setSelectedSetId] = React.useState(null);
  const [userColorsSet, setUserColorsSet] = React.useState(null);

  const selectedSet = React.useMemo(
    () => candleSets.find((c) => c.id === selectedSetId),
    [selectedSetId]
  );

  const selectNewSet = (newSet) => {
    setSelectedSetId(newSet);
    setStep(1);
  };

  const saveUserColorsSet = (set) => {
    setUserColorsSet(set);
    setTimeout(() => {
      setStep(2);
    }, 500);
  };

  const completeCandleConstructor = () => {
    setStep(0);
    setSelectedSetId(null);
    setUserColorsSet(null);
  };

  return (
    <div className="candleConstructor">
      <Head setStep={setStep} step={step} />
      {step === 0 && (
        <SelectSet
          candleSets={candleSets}
          selectedSetId={selectedSetId}
          selectNewSet={selectNewSet}
        />
      )}
      {step === 1 && (
        <Constructor
          selectedSet={
            userColorsSet && userColorsSet?.id === selectedSetId
              ? userColorsSet
              : selectedSet
          }
          saveUserColorsSet={saveUserColorsSet}
        />
      )}
      {step === 2 && (
        <ConstructorPreview
          selectedSet={userColorsSet}
          completeCandleConstructor={completeCandleConstructor}
        />
      )}
    </div>
  );
}

export default CandleConstructor;
