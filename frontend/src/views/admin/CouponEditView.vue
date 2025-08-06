
/* frontend/src/views/admin/CouponEditView.vue */
// This is a new page with a form for creating and editing coupons.
<template>
    <div>
        <h1>{{ isEditing ? 'Edit Coupon' : 'Create New Coupon' }}</h1>
        <form @submit.prevent="handleSubmit" class="coupon-form">
            <div class="form-group">
                <label for="code">Coupon Code</label>
                <input type="text" v-model="coupon.code" id="code" required>
            </div>
            <div class="form-group">
                <label for="discountType">Discount Type</label>
                <select v-model="coupon.discountType" id="discountType" required>
                    <option value="percentage">Percentage</option>
                    <option value="fixed">Fixed Amount</option>
                </select>
            </div>
            <div class="form-group">
                <label for="discountValue">Discount Value</label>
                <input type="number" v-model.number="coupon.discountValue" id="discountValue" step="0.01" required>
            </div>
            <div class="form-group">
                <label for="expiresAt">Expiration Date (Optional)</label>
                <input type="date" v-model="coupon.expiresAt" id="expiresAt">
            </div>
            <button type="submit" class="submit-btn">Save Coupon</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            coupon: {
                code: '',
                discountType: 'percentage',
                discountValue: 0,
                expiresAt: ''
            },
            isEditing: false
        };
    },
    async created() {
        if (this.$route.params.id) {
            this.isEditing = true;
            // Fetch existing coupon data for editing (not implemented in this snippet)
        }
    },
    methods: {
        async handleSubmit() {
            const token = localStorage.getItem('jwtToken');
            const couponData = { ...this.coupon };
            // Format date correctly before sending
            if (couponData.expiresAt) {
                couponData.expiresAt = new Date(couponData.expiresAt).toISOString();
            } else {
                delete couponData.expiresAt; // Don't send if empty
            }

            try {
                if (this.isEditing) {
                    // Update logic would go here
                } else {
                    await axios.post('/api/admin/coupons', couponData, { headers: { Authorization: token } });
                }
                this.$router.push('/admin/coupons');
            } catch (error) {
                console.error('Failed to save coupon:', error);
            }
        }
    }
}
</script>

<style scoped>
.coupon-form { max-width: 600px; }
.form-group { margin-bottom: 1rem; }
.form-group label { display: block; margin-bottom: 0.5rem; }
.form-group input, .form-group select { width: 100%; padding: 0.5rem; border-radius: 4px; border: 1px solid #ccc; box-sizing: border-box; }
.submit-btn { background-color: #00f5a0; color: #1a202c; padding: 0.75rem 1.5rem; border: none; border-radius: 8px; font-weight: bold; cursor: pointer; }
</style>