import PageWrapper from "components/Layout/PageWrapper";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import qs from "qs";

function Checkout() {
  const router = useRouter();
  const { status } = router.query;
  const { participant } = qs.parse(router.query);

  return (
    <>
      <Head>
        <title>Stripe Checkout with Next.js</title>
        <meta name="description" content="Checkout Redirect Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageWrapper>
        <main>
          <h1 className="text-4xl">Success</h1>
          {status && status === "success" && (
            <div className="bg-green-100 text-green-700 p-2 rounded border mb-2 border-green-700">
              Payment Successful
              <p>{JSON.stringify(participant, null, 2)}</p>
            </div>
          )}
          {status && status === "cancel" && (
            <div className="bg-red-100 text-red-700 p-2 rounded border mb-2 border-red-700">
              Payment Unsuccessful
            </div>
          )}
        </main>
      </PageWrapper>
    </>
  );
}

export default Checkout;
