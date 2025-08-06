
/* frontend/src/views/admin/OrderDetailView.vue */
// This is a new page for viewing and managing a single order.
<template>
    <div>
        <router-link to="/admin/orders">&larr; Back to Orders</router-link>
        <div v-if="loading">Loading order details...</div>
        <div v-else-if="order" class="order-detail-layout">
            <div class="order-summary">
                <h2>Order Details</h2>
                <p><strong>Order ID:</strong> {{ order._id }}</p>
                <p><strong>User:</strong> {{ order.user.name }} ({{ order.user.email }})</p>
                <p><strong>Total:</strong> ${{ order.total.toFixed(2) }}</p>
                <p><strong>Date:</strong> {{ new Date(order.date).toLocaleString() }}</p>
            </div>
            <div class="order-status">
                <h2>Update Status</h2>
                <p><strong>Current Status:</strong> {{ order.status }}</p>
                <div class="status-update-form">
                    <select v-model="newStatus">
                        <option>Processing</option>
                        <option>Shipped</option>
                        <option>Delivered</option>
                        <option>Cancelled</option>
                    </select>
                    <button @click="updateStatus">Update Status</button>
                </div>
            </div>
            <div class="order-items">
                <h2>Items in this Order</h2>
                <div v-for="item in order.items" :key="item.product._id" class="order-item-card">
                    <img :src="item.product.imageUrl" class="item-image"/>
                    <div>
                        <strong>{{ item.product.name }}</strong>
                        <p>{{ item.quantity }} x ${{ item.price.toFixed(2) }}</p>
                    </div>
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
            order: null,
            loading: true,
            newStatus: ''
        };
    },
    async created() {
        this.fetchOrder();
    },
    methods: {
        async fetchOrder() {
            const token = localStorage.getItem('jwtToken');
            const orderId = this.$route.params.id;
            try {
                const res = await axios.get(`/api/admin/orders/${orderId}`, { headers: { Authorization: token } });
                this.order = res.data;
                this.newStatus = this.order.status;
            } catch (error) {
                console.error('Failed to fetch order details:', error);
            } finally {
                this.loading = false;
            }
        },
        async updateStatus() {
            const token = localStorage.getItem('jwtToken');
            const orderId = this.$route.params.id;
            try {
                await axios.put(`/api/admin/orders/${orderId}/status`, 
                { status: this.newStatus }, 
                { headers: { Authorization: token } });
                
                this.fetchOrder(); // Refresh order details to show new status
            } catch (error) {
                console.error('Failed to update status:', error);
            }
        }
    }
}
</script>

<style scoped>
.order-detail-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-top: 1rem; }
.order-summary, .order-status, .order-items { background-color: white; border: 1px solid #ddd; border-radius: 8px; padding: 1.5rem; }
.order-items { grid-column: 1 / -1; } /* Span full width */
.status-update-form { display: flex; gap: 1rem; margin-top: 1rem; }
.status-update-form select { padding: 0.5rem; border-radius: 4px; border: 1px solid #ccc; }
.status-update-form button { background-color: #00f5a0; color: #1a202c; padding: 0.5rem 1rem; border: none; border-radius: 8px; font-weight: bold; cursor: pointer; }
.order-item-card { display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem; }
.item-image { width: 60px; height: 60px; object-fit: cover; border-radius: 4px; }
</style>