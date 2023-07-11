import stripe from "./stripe";

export default defineEventHandler(async (event) => {
  const { email } = await readBody(event);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 200,
    currency: "usd",
    metadata: { email },
  });
  if (!paymentIntent) throw new Error("Error!")
  return paymentIntent.client_secret;
});
