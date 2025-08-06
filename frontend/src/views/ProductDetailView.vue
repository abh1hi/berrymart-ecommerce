/* frontend/src/views/ProductDetailView.vue */
// Updated to display reviews and a form to add a new review.
<template>
  <div class="product-detail-layout">
    <div class="product-main-content">
      <div class="product-detail" v-if="product">
        <div class="product-image">
          <img :src="product.imageUrl" :alt="product.name" @error="imageError">
        </div>
        <div class="product-info">
          <h1>{{ product.name }}</h1>
          <p class="price">${{ product.price }}</p>
          <p class="description">{{ product.description }}</p>
          <div class="action-buttons">
            <button @click="addToCart" class="add-to-cart-btn">Add to Cart</button>
            <button @click="addToWishlist" class="wishlist-btn">Save for Later</button>
          </div>
          <p v-if="message" class="message">{{ message }}</p>
        </div>
      </div>
    </div>

    <!-- This v-if="product" check fixes the error -->
    <div class="reviews-section" v-if="product">
      <h2>Reviews</h2>
      <div v-if="product.reviews.length === 0">No reviews yet.</div>
      <div v-for="review in product.reviews" :key="review._id" class="review-card">
        <strong>{{ review.name }}</strong>
        <p>{{ review.comment }}</p>
        <span>Rating: {{ review.rating }} / 5</span>
      </div>

      <div class="review-form">
        <h3>Write a Customer Review</h3>
        <div v-if="isLoggedIn">
          <form @submit.prevent="submitReview">
            <div class="form-group">
              <label for="rating">Rating</label>
              <select v-model="rating" id="rating">
                <option value="1">1 - Poor</option>
                <option value="2">2 - Fair</option>
                <option value="3">3 - Good</option>
                <option value="4">4 - Very Good</option>
                <option value="5">5 - Excellent</option>
              </select>
            </div>
            <div class="form-group">
              <label for="comment">Comment</label>
              <textarea v-model="comment" id="comment" rows="4"></textarea>
            </div>
            <button type="submit" class="submit-review-btn">Submit Review</button>
            <p v-if="reviewError" class="error-message">{{ reviewError }}</p>
          </form>
        </div>
        <div v-else>
          Please <router-link to="/login">sign in</router-link> to write a review.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      product: null,
      message: '',
      isLoggedIn: false,
      rating: 5,
      comment: '',
      reviewError: ''
    };
  },
  created() {
    this.fetchProduct();
    this.checkLoginStatus();
  },
  methods: {
    async fetchProduct() {
        const productId = this.$route.params.id;
        try {
            const res = await axios.get(`/api/products/${productId}`);
            this.product = res.data;
        } catch (error) {
            console.error(error);
        }
    },
    checkLoginStatus() {
      this.isLoggedIn = !!localStorage.getItem('jwtToken');
    },
    async submitReview() {
        const token = localStorage.getItem('jwtToken');
        const productId = this.$route.params.id;
        try {
            await axios.post(`/api/products/${productId}/reviews`, 
            { rating: this.rating, comment: this.comment }, 
            { headers: { Authorization: token } });
            
            // Reset form and refetch product to show new review
            this.rating = 5;
            this.comment = '';
            this.reviewError = '';
            this.fetchProduct();

        } catch (error) {
            this.reviewError = error.response.data.msg || 'Failed to submit review.';
            console.error("Error submitting review:", error);
        }
    },
    // ... other methods like addToCart, addToWishlist, imageError
    async addToCart() {
      const token = localStorage.getItem('jwtToken');
      if (!token) { this.$router.push('/login'); return; }
      try {
        await axios.post('/api/cart', { productId: this.product._id, quantity: 1 }, { headers: { Authorization: token } });
        this.message = 'Product added to cart!';
        setTimeout(() => this.message = '', 3000);
      } catch (error) {
        this.message = 'Failed to add product to cart.';
        console.error("Error adding to cart:", error);
      }
    },
    async addToWishlist() {
      const token = localStorage.getItem('jwtToken');
      if (!token) { this.$router.push('/login'); return; }
      try {
        await axios.post('/api/wishlist', { productId: this.product._id }, { headers: { Authorization: token } });
        this.message = 'Product saved to wishlist!';
        setTimeout(() => this.message = '', 3000);
      } catch (error) {
        this.message = 'Failed to save product.';
        console.error("Error adding to wishlist:", error);
      }
    },
    imageError(event) {
      event.target.src = 'https://placehold.co/600x400/cccccc/FFFFFF?text=Image+Not+Found';
    }
  }
};
</script>

<style scoped>
.product-detail-layout { display: flex; flex-direction: column; gap: 2rem; }
.reviews-section { margin-top: 2rem; }
.review-card { background-color: #fff; border: 1px solid #eee; border-radius: 8px; padding: 1rem; margin-bottom: 1rem; }
.review-form { margin-top: 2rem; }
.form-group { margin-bottom: 1rem; }
.form-group label { display: block; margin-bottom: 0.5rem; }
.form-group select, .form-group textarea { width: 100%; padding: 0.5rem; border-radius: 4px; border: 1px solid #ccc; box-sizing: border-box; }
.submit-review-btn { background-color: #1a202c; color: white; padding: 0.75rem 1.5rem; border: none; border-radius: 8px; font-weight: bold; cursor: pointer; }
.error-message { color: red; margin-top: 1rem; }
/* Other styles remain the same */
.action-buttons { display: flex; gap: 1rem; margin-top: 1rem; }
.wishlist-btn { background-color: #e2e8f0; color: #1a202c; padding: 1rem 2rem; border: none; border-radius: 8px; font-weight: bold; cursor: pointer; font-size: 1.1rem; }
.product-detail { display: flex; gap: 2rem; margin-top: 2rem; }
.product-image { flex: 1; }
.product-image img { width: 100%; border-radius: 12px; }
.product-info { flex: 1; }
.price { color: #00f5a0; font-size: 2rem; font-weight: bold; margin: 1rem 0; }
.add-to-cart-btn { background-color: #00f5a0; color: #1a202c; padding: 1rem 2rem; border: none; border-radius: 8px; font-weight: bold; cursor: pointer; font-size: 1.1rem; }
.message { margin-top: 1rem; color: #00f5a0; font-weight: bold; }
</style>
