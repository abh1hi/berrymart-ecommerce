
/* frontend/src/views/OrderConfirmationView.vue */
// This is a new page to show after a successful order.
<template>
  <div class="confirmation-view">
    <h2>🎉 Thank You for Your Order!</h2>
    <p>Your order has been placed successfully.</p>
    <p><strong>Order ID:</strong> {{ orderId }}</p>
    <router-link to="/products" class="continue-shopping-btn">Continue Shopping</router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orderId: null
    };
  },
  created() {
    this.orderId = this.$route.params.id;
  }
};
</script>

<style scoped>
.confirmation-view { text-align: center; padding: 4rem 2rem; }
.confirmation-view h2 { font-size: 2.5rem; color: #00f5a0; }
.continue-shopping-btn { display: inline-block; margin-top: 2rem; background-color: #1a202c; color: white; padding: 1rem 2rem; border-radius: 8px; font-weight: bold; text-decoration: none; }
</style>

