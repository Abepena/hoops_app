import Head from "next/head";
import React from "react";
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import CopytoClipboard from "components/Fields/CopytoClipboard";
import Drawer from "components/Navbars/Drawer";

export default function order({
  receipt_url,
  customer,
  stripe_session,
  status,
  next,
}) {
  return (
    <>
      <Head>
        <title>Stripe Checkout Receipt</title>
        <meta name="description" content="Checkout Redirect Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Drawer>
        <main className="grid h-full place-items-center">
          <div className="card border border-neutral max-w-xs md:max-w-sm bg-base-100 shadow-xl">
            {receipt_url && (
              <figure className="py-4 bg-blue-100">
                <QRCodeSVG value={receipt_url} />
              </figure>
            )}

            <div className="card-body">
              <h2 className="card-title">Receipt</h2>

              {status && status === "success" && (
                <>
                  <p>
                    Copy the link below or screenshot this page as payment
                    confirmation.
                    <br />
                  </p>
                  <CopytoClipboard value={receipt_url} />
                </>
              )}
              {status && status === "cancel" && (
                <>
                  <div className="bg-red-100 text-red-700 p-2 rounded border mb-2 border-red-700">
                    Payment Unsuccessful or cancelled. Go back to the event to
                    attempt to register again.
                  </div>
                </>
              )}
              <div className="card-actions items-center">
                <Link href={next}>
                  <a className="btn btn-outline mr-4">Back to Event</a>
                </Link>
                <Link href={"/"}>
                  <a className="btn btn-success btn-outline">Home</a>
                </Link>
              </div>
            </div>
          </div>
        </main>
      </Drawer>
    </>
  );
}
export async function getServerSideProps(ctx) {
  const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);
  const { status, session_id, next } = ctx.query;
  let customer,
    paymentIntent,
    receipt_url,
    session = null;

  if (status === "success") {
    session = await stripe.checkout.sessions.retrieve(session_id);
    customer = await stripe.customers.retrieve(session.customer);
    paymentIntent = await stripe.paymentIntents.retrieve(
      session.payment_intent
    );
    receipt_url = paymentIntent.charges.data[0].receipt_url;
  }

  return {
    props: {
      receipt_url: receipt_url || null,
      customer: customer || null,
      stripe_session: session || null,
      status,
      next: next || null,
    },
  };
}
