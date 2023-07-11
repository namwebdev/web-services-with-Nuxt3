<template>
  <div>
    <button @click="isShow = true">Checkout</button>
    <div v-if="isShow">
      <LazyPayment />
    </div>
  </div>
</template>

<script setup lang="ts">
const isShow = ref(false);
4
const config = useRuntimeConfig();
</script>

<style scoped></style>
