import { Formik, Form } from "formik";
import { useState } from "react";
import { registrationSteps } from "components/Events/validationSchemas";
import { FormikWizard } from "formik-wizard-form";

const steps = ["register", "waiver", "confirm-and-pay"];

const formInitialValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  acceptedWaiver: false,
};



const handleSubmit = ( values ) => {
  setTimeout(alert(JSON.stringify(values, null, 2)), 400);
};

function EventRegisterForm() {
  return (
    <>
      {/* <Stepper activeStep={activeStep} /> */}

      <FormikWizard
        activeStepIndex={0}
        initialValues={formInitialValues}
        onSubmit={handleSubmit}
        steps={registrationSteps}
      >
        {({
          renderComponent,
          handlePrev,
          handleNext,
          isNextDisabled,
          isPrevDisabled,
          isLastStep,
          activeStepIndex,
        }) => (
          <>
            {renderComponent()}
            <div className="flex items-center justify-end mt-4 ">
              <button
                type="button"
                onClick={handlePrev}
                disabled={isPrevDisabled}
                className="btn btn-ghost mr-2"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={handleNext}
                disabled={isNextDisabled}
                className="btn btn-success flex items-center"
              >
                <span className="mr-2"></span> {isLastStep ? "Finish" : "Next"}
                <i className="fa-solid fa-arrow-right text-lg"></i>
              </button>
            </div>
          </>
        )}
      </FormikWizard>
    </>
  );
}

export default EventRegisterForm;
