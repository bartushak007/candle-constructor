import React from "react";
import "./candleConstructor.css";
import Head from "./components/head/Head";
import SelectSet from "./components/select-set/SelectSet";
import { candleSets } from "./assets/data";
import Constructor from "./components/constructor";

function CandleConstructor() {
  const [step, setStep] = React.useState(0);
  const [selectedSetId, setSelectedSetId] = React.useState(null);

  const selectNewSet = (newSet) => {
    setSelectedSetId(newSet);
    setStep(1);
  };
  const selectedSet = React.useMemo(
    () => candleSets.find((c) => c.id === selectedSetId),
    [selectedSetId]
  );

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
      {step === 1 && <Constructor modelsSettings={selectedSet.models} />}
    </div>
  );
}

export default CandleConstructor;
