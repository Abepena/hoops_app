import { Form } from "formik";
import React from "react";

function PaymentForm() {
  return (
    <Form id="payment">
      <ul className="steps w-full mx-auto">
        <li className="step step-success">Register</li>
        <li className="step step-success">Waiver</li>
        <li className="step step-success">Confirm and Pay</li>
      </ul>
      <section className="review-payment-info my-2">
        <h1 className="text-2xl">Payment</h1>
      </section>
    </Form>
  );
}

export default PaymentForm;
