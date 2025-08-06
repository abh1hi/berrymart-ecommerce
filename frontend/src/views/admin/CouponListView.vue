
/* frontend/src/views/admin/CouponListView.vue */
// This is a new page for admins to view and manage all coupons.
<template>
    <div>
        <div class="page-header">
            <h1>Coupon Management</h1>
            <router-link to="/admin/coupon/new" class="add-new-btn">Add New Coupon</router-link>
        </div>
        <div v-if="loading">Loading coupons...</div>
        <table v-else class="data-table">
            <thead>
                <tr>
                    <th>Code</th>
                    <th>Type</th>
                    <th>Value</th>
                    <th>Expires</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="coupon in coupons" :key="coupon._id">
                    <td>{{ coupon.code }}</td>
                    <td>{{ coupon.discountType }}</td>
                    <td>{{ coupon.discountType === 'percentage' ? `${coupon.discountValue}%` : `$${coupon.discountValue}` }}</td>
                    <td>{{ coupon.expiresAt ? new Date(coupon.expiresAt).toLocaleDateString() : 'Never' }}</td>
                    <td class="actions">
                        <router-link :to="`/admin/coupon/edit/${coupon._id}`" class="edit-btn">Edit</router-link>
                        <button @click="deleteCoupon(coupon._id)" class="delete-btn">Delete</button>
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
        return { coupons: [], loading: true };
    },
    async created() {
        this.fetchCoupons();
    },
    methods: {
        async fetchCoupons() {
            const token = localStorage.getItem('jwtToken');
            try {
                const res = await axios.get('/api/admin/coupons', { headers: { Authorization: token } });
                this.coupons = res.data;
            } catch (error) {
                console.error('Failed to fetch coupons:', error);
            } finally {
                this.loading = false;
            }
        },
        async deleteCoupon(id) {
            if (confirm('Are you sure you want to delete this coupon?')) {
                const token = localStorage.getItem('jwtToken');
                try {
                    await axios.delete(`/api/admin/coupons/${id}`, { headers: { Authorization: token } });
                    this.fetchCoupons(); // Refresh the list
                } catch (error) {
                    console.error('Failed to delete coupon:', error);
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
