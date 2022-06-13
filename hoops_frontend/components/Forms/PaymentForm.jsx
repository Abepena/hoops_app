import { useEventContext } from "contexts/EventContextProvider";
import { Form } from "formik";
import Image from "next/image";
import React from "react";
import Moment from "react-moment";
import { getImageFormatURL } from "utils/getImageURLs";

function PaymentForm() {
  const { event, image, location } = useEventContext();
  const { cost, name } = event.attributes;
  const { width, height } = image.data.attributes.formats.thumbnail;
  const img_url = getImageFormatURL(image, "thumbnail");
  // UI
  return (
    <Form id="payment" className="">
      <ul className="steps w-full mx-auto">
        <li className="step step-success">Register</li>
        <li className="step step-success">Waiver</li>
        <li className="step step-success">Confirm and Pay</li>
      </ul>
      <section className="bg-gray-100 review-payment-info my-6 w-8/12 p-4 gap-4rounded shadow-xl mx-auto flex gap-4 flex-wrap justify-center rounded">
        <div className="relative mb-2" style={{ height, width }}>
          <Image className="rounded" src={img_url} alt={name} layout="fill" />
        </div>
        <div className="">
          <h3 className="text-lg text-neutral">{`${name} ticket`}</h3>
          <Moment
            className="block text-neutral-content"
            date={event.attributes.date}
            format="ll"
          />
          <p className="text-neutral mt-2 ">Total: ${cost.toFixed(2)}</p>
        </div>
      </section>
    </Form>
  );
}

export default PaymentForm;
