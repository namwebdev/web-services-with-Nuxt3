// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    stripeSecret: '',
    stripeWebhookSecret: "",
    public: {
      stripeKey: ''
    }
  },
  devtools: { enabled: true }
})
