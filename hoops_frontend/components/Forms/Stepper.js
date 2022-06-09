import React from "react";

function _renderStep(step) {
  switch (step) {
    case 0:
      return (
        <ul className="steps w-full mx-auto">
          <li className="step step-success">Register</li>
          <li className="step">Waiver</li>
          <li className="step">Confirm and Pay</li>
        </ul>
      );
    case 1:
      return (
        <ul className="steps w-full mx-auto">
          <li className="step step-success">Register</li>
          <li className="step step-success">Waiver</li>
          <li className="step">Confirm and Pay</li>
        </ul>
      );
    case 2:
      return (
        <ul className="steps w-full mx-auto">
          <li className="step step-success">Register</li>
          <li className="step step-success">Waiver</li>
          <li className="step step-success">Confirm and Pay</li>
        </ul>
      );
    default:
      return (
        <ul className="steps w-full mx-auto">
          <li className="step step-success">Register</li>
          <li className="step step-success">Waiver</li>
          <li className="step step-success">Confirm and Pay</li>
        </ul>
      );
  }
}

function Stepper({ activeStep }) {
  return <>{_renderStep(activeStep)}</>;
}

export default Stepper;
