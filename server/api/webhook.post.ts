import stripe from "./stripe";

const STRIPE_WEBHOOK_SECRET = useRuntimeConfig().stripeWebhookSecret;

export default defineEventHandler(async (event) => {
  const signature = getHeader(event, "stripe-signature");
  console.log("🚀 ~ file: webhook.post.ts:7 ~ defineEventHandler ~ signature:", signature)
  const body = await readRawBody(event);
  //   console.log(STRIPE_WEBHOOK_SECRET)

  let stripeEvent;
  try {
    stripeEvent = await stripe.webhooks.constructEvent(
      body,
      signature,
      STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
  console.log(error);

    throw createError({
      statusCode: 400,
      statusMessage: "Invalid signature",
    });
  }

  if (stripeEvent.type === "payment_intent.succeeded") {
    // handle success
    console.log("ok");
  } else if (stripeEvent.type === "payment_intent.payment_failed") {
    // handle fail
    console.log("fail!");
  }

  return 200;
});
