
/* frontend/src/views/WishlistView.vue */
// This is a new page to display the user's wishlist.

/* frontend/src/views/WishlistView.vue */
// This is a new page to display the user's wishlist.
<template>
  <div class="wishlist-view">
    <h1>My Wishlist</h1>
    <div v-if="loading">Loading your wishlist...</div>
    <div v-else-if="!wishlist || wishlist.products.length === 0">Your wishlist is empty.</div>
    <div v-else class="products-grid">
      <div v-for="product in wishlist.products" :key="product._id" class="product-card">
        <router-link :to="'/product/' + product._id">
          <img :src="product.imageUrl" :alt="product.name" @error="imageError">
          <h2>{{ product.name }}</h2>
          <p class="price">${{ product.price }}</p>
        </router-link>
        <button @click="removeFromWishlist(product._id)" class="remove-btn">Remove</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      wishlist: null,
      loading: true,
    };
  },
  async mounted() { // <-- UPDATED from created() to mounted()
    this.fetchWishlist();
  },
  methods: {
    async fetchWishlist() {
      const token = localStorage.getItem('jwtToken');
      if (!token) { this.$router.push('/login'); return; }
      try {
        const res = await axios.get('/api/wishlist', { headers: { Authorization: token } });
        this.wishlist = res.data;
      } catch (error) {
        console.error('Error fetching wishlist:', error);
      } finally {
        this.loading = false;
      }
    },
    async removeFromWishlist(productId) {
      const token = localStorage.getItem('jwtToken');
      try {
        const res = await axios.delete(`/api/wishlist/${productId}`, { headers: { Authorization: token } });
        this.wishlist = res.data; // Update wishlist with the returned data
      } catch (error) {
        console.error('Error removing from wishlist:', error);
      }
    },
    imageError(event) {
      event.target.src = 'https://placehold.co/600x400/cccccc/FFFFFF?text=Image+Not+Found';
    }
  }
};
</script>

<style scoped>
.products-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 1.5rem; }
.product-card { border: 1px solid #ddd; border-radius: 8px; padding: 1rem; text-align: center; transition: box-shadow 0.3s ease; background-color: white; }
.product-card a { text-decoration: none; color: inherit; }
.product-card img { max-width: 100%; height: 200px; object-fit: cover; border-radius: 8px; margin-bottom: 1rem; }
.price { color: #00f5a0; font-weight: bold; font-size: 1.2rem; }
.remove-btn { margin-top: 1rem; background-color: #e53e3e; color: white; padding: 0.5rem 1rem; border: none; border-radius: 8px; cursor: pointer; }
</style>