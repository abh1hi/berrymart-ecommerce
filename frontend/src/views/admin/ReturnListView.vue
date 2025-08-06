
/* frontend/src/views/admin/ReturnListView.vue */
// This is a new page for admins to view and manage all return requests.
<template>
    <div>
        <h1>Return Management</h1>
        <div v-if="loading">Loading return requests...</div>
        <table v-else class="data-table">
            <thead>
                <tr>
                    <th>Order ID</th>
                    <th>User</th>
                    <th>Date Requested</th>
                    <th>Reason</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="order in returns" :key="order._id">
                    <td>{{ order._id }}</td>
                    <td>{{ order.user.name }}</td>
                    <td>{{ new Date(order.returnDetails.dateRequested).toLocaleDateString() }}</td>
                    <td>{{ order.returnDetails.reason }}</td>
                    <td>
                        <select v-model="order.returnDetails.status" @change="updateReturnStatus(order._id, $event)">
                            <option>Pending</option>
                            <option>Approved</option>
                            <option>Rejected</option>
                        </select>
                    </td>
                    <td>
                        <router-link :to="`/admin/order/${order._id}`" class="view-btn">View Order</router-link>
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
        return { returns: [], loading: true };
    },
    async created() {
        this.fetchReturns();
    },
    methods: {
        async fetchReturns() {
            const token = localStorage.getItem('jwtToken');
            try {
                const res = await axios.get('/api/admin/returns', { headers: { Authorization: token } });
                this.returns = res.data;
            } catch (error) {
                console.error('Failed to fetch returns:', error);
            } finally {
                this.loading = false;
            }
        },
        async updateReturnStatus(orderId, event) {
            const token = localStorage.getItem('jwtToken');
            const newStatus = event.target.value;
            try {
                await axios.put(`/api/admin/returns/${orderId}`, { status: newStatus }, { headers: { Authorization: token } });
                // Optionally show a success message
            } catch (error) {
                console.error('Failed to update return status:', error);
            }
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