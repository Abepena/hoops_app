import { registrationSteps } from "components/Events/validationSchemas";
import { useWizardContext } from "contexts/WizardContextProvider";
import { FormikWizard } from "formik-wizard-form";
import { useSession } from "next-auth/react";
import { loadStripe } from "@stripe/stripe-js";
import { getImageFormatURL } from "utils/getImageURLs";
import { useEventContext } from "contexts/EventContextProvider";
import axios from "axios";

//STRIPE CONFIG
const publicKey = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY;
const stripePromise = loadStripe(publicKey);

function EventRegisterForm() {
  //CONTEXT VALUES
  const { user } = useSession();

  const { event, image, location } = useEventContext();
  const { cost, name } = event.attributes;
  const { wizardState, setWizardState, loading, setLoading } =
    useWizardContext();

  const createCheckOutSession = async (values, { resetForm }) => {
    setLoading(true);
    const stripe = await stripePromise;
    const item = {
      name: `${name} ticket`,
      description: `${name} ticket`,
      image: getImageFormatURL(image, "thumbnail"),
      price: cost,
      quantity: 1,
    };

    const participant = {
      user_id: user ? user.attributes.id : null,
      event_id: event.attributes.id,
      name: `${wizardState.firstName} ${wizardState.lastName}`,
      email: wizardState.email,
      phone: wizardState.phone,
    };

    const checkoutSession = await axios.post("/api/create-stripe-session", {
      item,
      participant,
    });

    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });
    if (result.error) {
      alert(result.error.message);
    }
    setLoading(false);
    resetForm();
  };

  const handleSubmit = (values) => {
    //TODO: Free events just register a participant no stripe needed
    setLoading(true);
    setTimeout(() => {
      setLoading(true);
      alert(JSON.stringify({ ...values }, null, 2));
      setLoading(false);
    }, 1000);
  };

  const formInitialValues = {
    user: user ? user.id : null,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    acceptedWaiver: false,
  };

  return (
    <>
      <FormikWizard
        activeStepIndex={0}
        initialValues={formInitialValues}
        onSubmit={createCheckOutSession}
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
          values,
        }) => (
          <>
            {renderComponent()}
            <div className="flex items-center justify-end mt-4">
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
                onClick={() => {
                  setWizardState(values);
                  handleNext();
                }}
                disabled={isNextDisabled}
                className="btn btn-success flex items-center"
              >
                {loading ? (
                  <i className="fas text-3xl fa-circle-notch fa-spin"></i>
                ) : (
                  <>
                    <span className="mr-2">
                      {isLastStep ? "Finish" : "Next"}
                    </span>
                    <i className="fa-solid fa-arrow-right"></i>
                  </>
                )}
              </button>
            </div>
          </>
        )}
      </FormikWizard>
    </>
  );
}

export default EventRegisterForm;
