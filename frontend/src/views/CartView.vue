
/* frontend/src/views/CartView.vue */
// This is a new page to display the contents of the user's cart.

/* frontend/src/views/CartView.vue */
// Updated so the "Proceed to Checkout" button now links to the checkout page.
<template>
  <div class="cart-view">
    <h1>Your Shopping Cart</h1>
    <div v-if="loading">Loading...</div>
    <div v-else-if="!cart || cart.items.length === 0">Your cart is empty.</div>
    <div v-else>
      <div v-for="item in cart.items" :key="item.product._id" class="cart-item">
        <img :src="item.product.imageUrl" :alt="item.product.name" class="item-image">
        <div class="item-details">
          <h2>{{ item.product.name }}</h2>
          <p>Quantity: {{ item.quantity }}</p>
        </div>
        <p class="item-price">${{ item.product.price }}</p>
      </div>
      <div class="cart-total">
        <h3>Total: ${{ total }}</h3>
        <router-link to="/checkout" class="checkout-btn">Proceed to Checkout</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      cart: null,
      loading: true,
    };
  },
  computed: {
    total() {
      if (!this.cart) return 0;
      return this.cart.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0).toFixed(2);
    }
  },
  async created() {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      this.$router.push('/login');
      return;
    }
    try {
      const res = await axios.get('/api/cart', {
        headers: { Authorization: token }
      });
      this.cart = res.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        this.cart = null; // Handle case where cart is empty or not found
      } else {
        console.error('Error fetching cart:', error);
      }
    } finally {
      this.loading = false;
    }
  }
};
</script>

<style scoped>
.cart-item { display: flex; align-items: center; margin-bottom: 1.5rem; border-bottom: 1px solid #eee; padding-bottom: 1.5rem; }
.item-image { width: 100px; height: 100px; object-fit: cover; border-radius: 8px; margin-right: 1.5rem; }
.item-details { flex-grow: 1; }
.item-details h2 { margin: 0 0 0.5rem 0; }
.item-price { font-size: 1.2rem; font-weight: bold; }
.cart-total { text-align: right; margin-top: 2rem; }
.checkout-btn { background-color: #00f5a0; color: #1a202c; padding: 1rem 2rem; border-radius: 8px; font-weight: bold; text-decoration: none; font-size: 1.1rem; }
</style>
