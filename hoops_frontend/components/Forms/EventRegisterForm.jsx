import { registrationSteps } from "components/Events/validationSchemas";
import { useWizardContext } from "contexts/WizardContextProvider";
import { FormikWizard } from "formik-wizard-form";
import { useSession } from "next-auth/react";
import { loadStripe } from "@stripe/stripe-js";
import { getImageFormatURL } from "utils/getImageURLs";
import { useEventContext } from "contexts/EventContextProvider";
import axios from "axios";
import FormSuccess from "./FormSuccess";
import Router from "next/router";
import { toast } from "react-toastify";

//STRIPE CONFIG
const publicKey = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY;
const stripePromise = loadStripe(publicKey);

function EventRegisterForm() {
  const notify = () =>
    toast.info("Redirecting to Payment Portal", {
      position: "top-center",
      theme: "dark",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  //CONTEXT VALUES
  const { user } = useSession();
  const { event, image, participants, setParticipants, updateEvent } =
    useEventContext();
  const { setWizardState, loading, setLoading, finished, setFinished } =
    useWizardContext();
  const { cost, name } = event.attributes;

  const createCheckOutSession = async (item, participant) => {
    setLoading(true);
    const stripe = await stripePromise;
    const checkoutSession = await axios.post("/api/create-stripe-session", {
      item,
      participant,
      endpoint: window.location.pathname,
    });

    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });
    if (result.error) {
      alert(result.error.message);
    }
  };

  const handleSubmit = async (values, { resetForm }) => {
    setLoading(true);
    const isFree = !cost;
    const item = {
      name: `${name} ticket`,
      description: `${name} ticket`,
      image: getImageFormatURL(image, "thumbnail"),
      price: cost,
      quantity: 1,
    };

    const participant = {
      user_id: user ? user.id : null,
      event_id: event.id,
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      phone: values.phone,
    };

    if (isFree) {
      const res = await updateEvent(event.id, {
        data: {
          participants: [participant, ...(participants ?? [])],
        },
      });
      setParticipants(res.data.data.attributes.participants);
    } else {
      notify();
      createCheckOutSession(item, participant);
    }
    resetForm();
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
      {finished ? (
        <FormSuccess />
      ) : (
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
            currentStepIndex,
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
                    setWizardState({
                      ...values,
                    });
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
      )}
    </>
  );
}

export default EventRegisterForm;
