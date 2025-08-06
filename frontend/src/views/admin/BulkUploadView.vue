
/* frontend/src/views/admin/BulkUploadView.vue */
// This is a new page for admins to bulk upload products via JSON.
<template>
    <div>
        <h1>Bulk Upload Products</h1>
        <p>Paste your JSON array of products below. This will replace all existing products.</p>
        <div class="upload-form">
            <textarea v-model="jsonData" placeholder="[ { ...product1 }, { ...product2 } ]"></textarea>
            <button @click="uploadProducts" class="upload-btn">Upload Products</button>
            <p v-if="message" :class="{ 'error-message': isError, 'success-message': !isError }">{{ message }}</p>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            jsonData: '',
            message: '',
            isError: false
        };
    },
    methods: {
        async uploadProducts() {
            this.message = '';
            this.isError = false;

            let products;
            try {
                products = JSON.parse(this.jsonData);
            } catch (error) {
                this.message = 'Invalid JSON format.';
                this.isError = true;
                return;
            }

            if (!Array.isArray(products)) {
                this.message = 'The data must be a JSON array.';
                this.isError = true;
                return;
            }

            const token = localStorage.getItem('jwtToken');
            try {
                const res = await axios.post('/api/admin/products/bulk', products, { headers: { Authorization: token } });
                this.message = res.data.msg;
                setTimeout(() => this.$router.push('/admin/products'), 2000); // Redirect after 2 seconds
            } catch (error) {
                this.message = 'Failed to upload products.';
                this.isError = true;
                console.error('Failed to bulk upload:', error);
            }
        }
    }
}
</script>

<style scoped>
.upload-form { display: flex; flex-direction: column; }
textarea { width: 100%; height: 400px; margin-bottom: 1rem; padding: 0.5rem; border-radius: 4px; border: 1px solid #ccc; font-family: monospace; }
.upload-btn { background-color: #00f5a0; color: #1a202c; padding: 0.75rem 1.5rem; border: none; border-radius: 8px; font-weight: bold; cursor: pointer; align-self: flex-start; }
.error-message { color: red; margin-top: 1rem; }
.success-message { color: green; margin-top: 1rem; }
</style>
