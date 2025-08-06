
/* frontend/src/views/ProductsView.vue */
// This new page fetches and displays a list of all products.

/* frontend/src/views/ProductsView.vue */
// This page fetches and displays a list of all products.
/* frontend/src/views/ProductsView.vue */
// Updated to include a search bar and category filters.
<template>
  <div class="products-view">
    <h1>Our Products</h1>

    <div class="filters">
      <input 
        type="text" 
        v-model="searchKeyword" 
        @input="fetchProducts" 
        placeholder="Search products..." 
        class="search-bar"
      />
      <select v-model="selectedCategory" @change="fetchProducts" class="category-filter">
        <option value="">All Categories</option>
        <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
      </select>
    </div>

    <div v-if="loading" class="loading">Loading...</div>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="!loading && products.length === 0" class="no-products">No products found.</div>
    <div v-if="products.length" class="products-grid">
      <div v-for="product in products" :key="product._id" class="product-card">
        <router-link :to="'/product/' + product._id">
          <img :src="product.imageUrl" :alt="product.name" @error="imageError">
          <h2>{{ product.name }}</h2>
          <p class="price">${{ product.price.toFixed(2) }}</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      products: [],
      loading: true,
      error: null,
      searchKeyword: '',
      selectedCategory: '',
      categories: ['Fruits', 'Vegetables', 'Dairy', 'Bakery', 'Meat', 'Beverages', 'Pantry', 'Snacks'] // Static list for now
    };
  },
  created() {
    this.fetchProducts();
  },
  methods: {
    async fetchProducts() {
      this.loading = true;
      try {
        const params = {};
        if (this.searchKeyword) {
          params.keyword = this.searchKeyword;
        }
        if (this.selectedCategory) {
          params.category = this.selectedCategory;
        }

        const res = await axios.get('/api/products', { params });
        this.products = res.data;
      } catch (err) {
        this.error = 'Failed to load products.';
        console.error("Error fetching products:", err);
      } finally {
        this.loading = false;
      }
    },
    imageError(event) {
      event.target.src = 'https://placehold.co/600x400/cccccc/FFFFFF?text=Image+Not+Found';
    }
  }
};
</script>

<style scoped>
.filters {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}
.search-bar, .category-filter {
  padding: 0.75rem;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 1rem;
}
.search-bar {
  flex-grow: 1;
}
.no-products {
    text-align: center;
    margin-top: 2rem;
    color: #555;
}
.products-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 1.5rem; }
.product-card { border: 1px solid #ddd; border-radius: 8px; padding: 1rem; text-align: center; transition: box-shadow 0.3s ease; background-color: white; }
.product-card:hover { box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
.product-card a { text-decoration: none; color: inherit; }
.product-card img { max-width: 100%; height: 200px; object-fit: cover; border-radius: 8px; margin-bottom: 1rem; }
.price { color: #00f5a0; font-weight: bold; font-size: 1.2rem; }
</style>