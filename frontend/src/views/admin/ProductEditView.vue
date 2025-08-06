
/* frontend/src/views/admin/ProductEditView.vue */
// This is a new page with a form for creating and editing products.
<template>
    <div>
        <h1>{{ isEditing ? 'Edit Product' : 'Create New Product' }}</h1>
        <form @submit.prevent="handleSubmit" class="product-form">
            <div class="form-group">
                <label for="name">Product Name</label>
                <input type="text" v-model="product.name" id="name" required>
            </div>
            <div class="form-group">
                <label for="description">Description</label>
                <textarea v-model="product.description" id="description" rows="4" required></textarea>
            </div>
            <div class="form-group">
                <label for="price">Price</label>
                <input type="number" v-model.number="product.price" id="price" step="0.01" required>
            </div>
            <div class="form-group">
                <label for="category">Category</label>
                <input type="text" v-model="product.category" id="category" required>
            </div>
            <div class="form-group">
                <label for="stock">Stock</label>
                <input type="number" v-model.number="product.stock" id="stock" required>
            </div>
             <div class="form-group">
                <label for="imageUrl">Image URL</label>
                <input type="text" v-model="product.imageUrl" id="imageUrl" required>
            </div>
            <button type="submit" class="submit-btn">Save Product</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            product: {
                name: '',
                description: '',
                price: 0,
                category: '',
                stock: 0,
                imageUrl: ''
            },
            isEditing: false
        };
    },
    async created() {
        if (this.$route.params.id) {
            this.isEditing = true;
            try {
                const res = await axios.get(`/api/products/${this.$route.params.id}`);
                this.product = res.data;
            } catch (error) {
                console.error('Failed to fetch product for editing:', error);
            }
        }
    },
    methods: {
        async handleSubmit() {
            const token = localStorage.getItem('jwtToken');
            try {
                if (this.isEditing) {
                    await axios.put(`/api/admin/products/${this.product._id}`, this.product, { headers: { Authorization: token } });
                } else {
                    await axios.post('/api/admin/products', this.product, { headers: { Authorization: token } });
                }
                this.$router.push('/admin/products');
            } catch (error) {
                console.error('Failed to save product:', error);
            }
        }
    }
}
</script>

<style scoped>
.product-form { max-width: 600px; }
.form-group { margin-bottom: 1rem; }
.form-group label { display: block; margin-bottom: 0.5rem; }
.form-group input, .form-group textarea { width: 100%; padding: 0.5rem; border-radius: 4px; border: 1px solid #ccc; box-sizing: border-box; }
.submit-btn { background-color: #00f5a0; color: #1a202c; padding: 0.75rem 1.5rem; border: none; border-radius: 8px; font-weight: bold; cursor: pointer; }
</style>