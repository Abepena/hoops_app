import axios from "axios";
import { buffer } from "micro";
import Stripe from "stripe";
const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY, {
  apiVersion: "2020-08-27",
});

const webhookSecret = process.env.NEXT_PUBLIC_STRIPE_WEBHOOK_SECRET;

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    const buf = await buffer(req);
    const sig = req.headers["stripe-signature"];

    let event;
    let session;

    try {
      event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
    } catch (err) {
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    switch (event.type) {
      case "checkout.session.completed":
        session = event.data.object;
        const { participant } = session.metadata;
        const url = `${process.env.NEXT_PUBLIC_API_URL}/api/events/${participant.event_id}`;

        //get participants
        const res1 = await axios.get(url + "?fields[0]=participants");
        const { participants } = res1.data.data.attributes;

        //update participants
        const res2 = await axios.put(url, {
          data: {
            participants: [participant, ...(participants || [])],
          },
          headers: {
            Authorization: process.env.NEXT_PUBLIC_API_TOKEN
          }
        });

        console.log(res2.data);

        console.log(JSON.stringify(session));
        break;
      case "payment_intent.succeeded":
        session = event.data.object;
        // TBD

        break;
      case "customer.created":
        session = event.data.object;
      //TBD

      case "charge.succeeded":
        session = event.data.object;
        // TBD

        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    return res.status(200).json({ received: true });
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method not allowed");
  }
}

// notify();
