import qs from "qs";

const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

async function CreateStripeSession(req, res) {
  const { item, participant } = req.body;

  const query = qs.stringify({
    status: "success",
    participant,
  });

  const redirectURL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000/checkout"
      : "https://pure-hoops.vercel.app/checkout";

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
    success_url: redirectURL + `?${query}`,
    cancel_url: redirectURL + "?status=cancel",
    metadata: {
      images: item.image,
    },
  });

  res.json({ id: session.id });
}

export default CreateStripeSession;
