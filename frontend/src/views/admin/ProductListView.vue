
/* frontend/src/views/admin/ProductListView.vue */
// This is a new page for admins to view and manage all products.
<template>
    <div>
        <div class="page-header">
            <h1>Product Management</h1>
            <router-link to="/admin/product/new" class="add-new-btn">Add New Product</router-link>
        </div>
        <div v-if="loading">Loading products...</div>
        <table v-else class="data-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="product in products" :key="product._id">
                    <td>{{ product.name }}</td>
                    <td>{{ product.category }}</td>
                    <td>${{ product.price.toFixed(2) }}</td>
                    <td>{{ product.stock }}</td>
                    <td class="actions">
                        <router-link :to="`/admin/product/edit/${product._id}`" class="edit-btn">Edit</router-link>
                        <button @click="deleteProduct(product._id)" class="delete-btn">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return { products: [], loading: true };
    },
    async created() {
        this.fetchProducts();
    },
    methods: {
        async fetchProducts() {
            try {
                const res = await axios.get('/api/products');
                this.products = res.data;
            } catch (error) {
                console.error('Failed to fetch products:', error);
            } finally {
                this.loading = false;
            }
        },
        async deleteProduct(id) {
            if (confirm('Are you sure you want to delete this product?')) {
                const token = localStorage.getItem('jwtToken');
                try {
                    await axios.delete(`/api/admin/products/${id}`, { headers: { Authorization: token } });
                    this.fetchProducts(); // Refresh the list
                } catch (error) {
                    console.error('Failed to delete product:', error);
                }
            }
        }
    }
}
</script>

<style scoped>
.page-header { display: flex; justify-content: space-between; align-items: center; }
.add-new-btn { background-color: #00f5a0; color: #1a202c; padding: 0.75rem 1.5rem; border-radius: 8px; text-decoration: none; font-weight: bold; }
.data-table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
.data-table th, .data-table td { border: 1px solid #ddd; padding: 0.75rem; text-align: left; }
.data-table th { background-color: #f7fafc; }
.actions a, .actions button { margin-right: 0.5rem; }
.edit-btn { text-decoration: none; color: #3182ce; }
.delete-btn { background: none; border: none; color: #e53e3e; cursor: pointer; padding: 0; }
</style>
