import qs from "qs";

const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

async function CreateStripeSession(req, res) {
  const { item, participant, endpoint } = req.body;

  const redirectURL =
    process.env.NODE_ENV === "development"
      ? `http://localhost:3000/`
      : `https://pure-hoops.vercel.app/`;

  const transformedItem = {
    price_data: {
      currency: "usd",
      product_data: {
        images: [item.image],
        name: item.name,
      },
      unit_amount: item.price * 100,
    },
    description: item.description,
    quantity: item.quantity,
  };

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [transformedItem],
    mode: "payment",
    customer_email: participant.email,
    success_url:
      redirectURL +
      `/order?status=success&next=${endpoint}&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url:
      redirectURL +
      `/order?status=cancel&next=${endpoint}&session_id={CHECKOUT_SESSION_ID}`,
    metadata: {
      images: item.image,
      item: JSON.stringify(item, null, 2),
      participant: JSON.stringify(participant, null, 2),
    },
  });

  res.json({ id: session.id });
}

export default CreateStripeSession;
