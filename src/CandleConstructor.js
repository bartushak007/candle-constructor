import React from "react";
import "./candleConstructor.css";
import Head from "./components/head/Head";
import Constructor from "./components/constructor/Constructor";

function CandleConstructor() {
  const [step, setStep] = React.useState(2);

  return (
    <div className="candleConstructor">
      <Head setStep={setStep} step={step} />
      <Constructor />
    </div>
  );
}

export default CandleConstructor;
