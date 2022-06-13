import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import EventRegisterForm from "components/Forms/EventRegisterForm";

const stripePromise = loadStripe("pk_test_p4TrzUQEu2nYIDv5yMoTH8iQ");

function EventRegisterModal({ cost }) {
  return (
    <div className="">
      <input type="checkbox" id="event-signup-modal" className="modal-toggle" />
      <label htmlFor="event-signup-modal" className="modal modal-bottom sm:modal-middle cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <EventRegisterForm />
        </label>
      </label>
    </div>
  );
}

export default EventRegisterModal;
