import { Formik, Form } from "formik";
import * as Yup from "yup";
import { WaiverCheckbox, TextInput } from "components/Forms/Fields";
import { useState } from "react";

import UserInfoForm from "./UserInfoForm";
import WaiverForm from "./WaiverForm";
import PaymentForm from "./PaymentForm";
import Stepper from "./Stepper";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const steps = ["resgister", "waiver", "confirm-and-pay"];

const validationSchemas = [
  Yup.object({
    firstName: Yup.string()
      .max(15, "Must be 15 characters or less")
      .required("Required"),
    lastName: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    phone: Yup.string().matches(phoneRegExp, "Phone number is not valid"),
  }),
  Yup.object({
    acceptedWaiver: Yup.boolean().oneOf(
      [true],
      "You must read and accept the waiver in order to participate"
    ),
  }),
];

const formInitialValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  acceptedWaiver: false,
};

function _renderStepContent(step) {
  switch (step) {
    case 0:
      return <UserInfoForm />;
    case 1:
      return <WaiverForm />;
    case 2:
      return <PaymentForm />;
    default:
      return <div className="grid place-items-center">Form Not Found</div>;
  }
}

function EventRegisterForm() {
  const [activeStep, setActiveStep] = useState(0);
  const isLastStep = activeStep === steps.length - 1;

  function _handleBack() {
    setActiveStep(activeStep - 1);
  }

  function _handleSubmit(values, actions) {
    if (isLastStep) {
      _submitForm(values, actions);
    } else {
      setActiveStep(activeStep + 1);
      actions.setTouched({});
      actions.setSubmitting(false);
    }
  }

  function _sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function _submitForm(values, actions) {
    await _sleep(1000);
    alert(JSON.stringify(values, null, 2));
    actions.setSubmitting(false);

    setActiveStep(activeStep + 1);
  }

  function _getValidationSchema(step) {
    try {
      return validationSchemas[activeStep];
    } catch {
      return {};
    }
  }

  return (
    <>
      <Stepper activeStep={activeStep} />
      {activeStep === steps.length ? (
        <div className="text-3xl">Success</div>
      ) : (
        <Formik
          initialValues={formInitialValues}
          validationSchema={_getValidationSchema(activeStep)}
          onSubmit={_handleSubmit}
        >
          <Form id={steps[activeStep]}>
            {_renderStepContent(activeStep)}
            <div className="flex items-center justify-end mt-4 ">
              {activeStep > 0 && (
                <button onClick={_handleBack} className="btn btn-ghost mr-2">
                  Back
                </button>
              )}
              <button
                type="submit"
                className="btn btn-success flex items-center"
              >
                <span className="mr-2">{isLastStep ? "Checkout" : "Next"}</span>
                <i className="fa-solid fa-arrow-right text-lg"></i>
              </button>
            </div>
          </Form>
        </Formik>
      )}
    </>
  );
}

export default EventRegisterForm;
