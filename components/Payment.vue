<template>
  Payment
  <div id="card-element"></div>
  <button @click="handleSubmit">Pay</button>
</template>

<script setup>
const stripe = ref(null);
const card = ref(null);
const paymentIntentId = ref(null);
const config = useRuntimeConfig();

const formStyle = {
  base: {
    fontSize: "16px",
    color: "#3d4852",
    "::placeholder": {
      color: "#8795a1",
    },
  },
};

const elements = computed(() => stripe.value?.elements());

const setupStripe = () => {
  stripe.value = Stripe(config.public.stripeKey);

  if (!card.value && elements.value) {
    card.value = elements.value.create("card", { style: formStyle });
  }
  card.value.mount("#card-element");
};

const handleSubmit = async () => {
  const email = "test@example.com";

  let secret
  try {
    const response = await $fetch("/api/paymentIntent", {
      method: "POST",
      body: {
        email,
      },
    });
    secret = response
  } catch (e) {
    console.error(e);
  }
  if (!secret) return;

  try {
    const response = await stripe.value.confirmCardPayment(secret, {
      payment_method: {
        card: card.value,
      },
      receipt_email: email,
    });
    console.log(response)
    if (response.paymentIntent.status === "succeeded") {
      paymentIntentId.value = response.paymentIntent.id;
    }
  } catch (e) {
    console.error(e);
  }
};

useHead({
  script: [
    {
      src: "https://js.stripe.com/v3/",
      onload: setupStripe,
    },
  ],
});
</script>

<style scoped></style>
