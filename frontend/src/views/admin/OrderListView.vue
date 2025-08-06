
/* frontend/src/views/admin/OrderListView.vue */
// This is a new page for admins to view all orders.

/* frontend/src/views/admin/OrderListView.vue */
// This page is for admins to view all orders.

/* frontend/src/views/admin/OrderListView.vue */
// Updated to make each order row a clickable link to the detail page.
<template>
    <div>
        <h1>Order Management</h1>
        <div v-if="loading">Loading orders...</div>
        <table v-else class="data-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>User</th>
                    <th>Date</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="order in orders" :key="order._id">
                    <td>{{ order._id }}</td>
                    <td>{{ order.user ? order.user.name : 'N/A' }}</td>
                    <td>{{ new Date(order.date).toLocaleDateString() }}</td>
                    <td>${{ order.total.toFixed(2) }}</td>
                    <td>{{ order.status }}</td>
                    <td>
                        <router-link :to="`/admin/order/${order._id}`" class="view-btn">View Details</router-link>
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
        return { orders: [], loading: true };
    },
    async created() {
        const token = localStorage.getItem('jwtToken');
        try {
            const res = await axios.get('/api/admin/orders', { headers: { Authorization: token } });
            this.orders = res.data;
        } catch (error) {
            console.error('Failed to fetch orders:', error);
        } finally {
            this.loading = false;
        }
    }
}
</script>

<style scoped>
.data-table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
.data-table th, .data-table td { border: 1px solid #ddd; padding: 0.75rem; text-align: left; }
.data-table th { background-color: #f7fafc; }
.view-btn { text-decoration: none; color: #3182ce; font-weight: bold; }
</style>
