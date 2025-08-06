
/* frontend/src/views/CheckoutView.vue */
// This is a new page to summarize the order and place it.
/* frontend/src/views/CheckoutView.vue */
// Updated to include a form for applying coupons.
<template>
  <div class="checkout-view">
    <h1>Checkout</h1>
    <div v-if="loading">Loading cart...</div>
    <div v-else-if="!cart || cart.items.length === 0">
        <p>Your cart is empty. Add items to proceed.</p>
    </div>
    <div v-else class="checkout-details">
        <div class="order-summary">
            <h2>Order Summary</h2>
            <div v-for="item in cart.items" :key="item.product._id" class="summary-item">
                <span>{{ item.product.name }} (x{{ item.quantity }})</span>
                <span>${{ (item.product.price * item.quantity).toFixed(2) }}</span>
            </div>
            <hr>
            <div class="summary-total">
                <strong>Subtotal</strong>
                <strong>${{ originalTotal }}</strong>
            </div>
            <!-- Coupon Section -->
            <div v-if="discount > 0" class="summary-item discount">
                <span>Discount ({{ appliedCouponCode }})</span>
                <span>-${{ discount }}</span>
            </div>
            <div class="summary-total final-total">
                <strong>Total</strong>
                <strong>${{ finalTotal }}</strong>
            </div>
        </div>

        <div class="coupon-form">
            <input type="text" v-model="couponCode" placeholder="Enter Coupon Code">
            <button @click="applyCoupon">Apply</button>
        </div>
        <p v-if="couponMessage" :class="{ 'error-message': couponError, 'success-message': !couponError }">{{ couponMessage }}</p>

        <button @click="placeOrder" class="place-order-btn">Place Order</button>
        <p v-if="error" class="error-message">{{ error }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            cart: null,
            loading: true,
            error: null,
            couponCode: '',
            appliedCouponCode: '',
            discount: 0,
            couponMessage: '',
            couponError: false
        };
    },
    computed: {
        originalTotal() {
            if (!this.cart) return 0;
            return this.cart.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0).toFixed(2);
        },
        finalTotal() {
            return (this.originalTotal - this.discount).toFixed(2);
        }
    },
    async created() {
        const token = localStorage.getItem('jwtToken');
        if (!token) {
            this.$router.push('/login');
            return;
        }
        try {
            const res = await axios.get('/api/cart', { headers: { Authorization: token } });
            this.cart = res.data;
        } catch (err) {
            console.error('Error fetching cart for checkout:', err);
        } finally {
            this.loading = false;
        }
    },
    methods: {
        async applyCoupon() {
            const token = localStorage.getItem('jwtToken');
            this.couponError = false;
            this.couponMessage = '';
            try {
                const res = await axios.post('/api/coupons/apply', 
                { code: this.couponCode }, 
                { headers: { Authorization: token } });
                
                this.discount = res.data.discountAmount;
                this.appliedCouponCode = res.data.couponCode;
                this.couponMessage = `Coupon "${res.data.couponCode}" applied successfully!`;

            } catch (err) {
                this.discount = 0;
                this.appliedCouponCode = '';
                this.couponError = true;
                this.couponMessage = err.response.data.msg || 'Invalid coupon code.';
            }
        },
        async placeOrder() {
            // Note: For a real app, you'd pass the coupon info to the order endpoint
            // For now, it places the order with the original total.
            const token = localStorage.getItem('jwtToken');
            try {
                const res = await axios.post('/api/orders', {}, { headers: { Authorization: token } });
                this.$router.push(`/order-confirmation/${res.data._id}`);
            } catch (err) {
                this.error = 'Failed to place order. Please try again.';
                console.error('Order placement error:', err);
            }
        }
    }
};
</script>

<style scoped>
.checkout-details { max-width: 600px; margin: 2rem auto; }
.order-summary { border: 1px solid #ddd; border-radius: 8px; padding: 1.5rem; background-color: white; }
.summary-item, .summary-total { display: flex; justify-content: space-between; margin-bottom: 1rem; }
.summary-total { font-size: 1.2rem; }
.discount { color: green; }
.final-total { border-top: 2px solid #eee; padding-top: 1rem; }
.coupon-form { display: flex; margin-top: 1.5rem; gap: 1rem; }
.coupon-form input { flex-grow: 1; padding: 0.75rem; border: 1px solid #ccc; border-radius: 8px; }
.coupon-form button { background-color: #1a202c; color: white; padding: 0.75rem 1.5rem; border: none; border-radius: 8px; font-weight: bold; cursor: pointer; }
.place-order-btn { width: 100%; padding: 1rem; margin-top: 1.5rem; background-color: #00f5a0; color: #1a202c; border: none; border-radius: 8px; font-weight: bold; cursor: pointer; font-size: 1.2rem; }
.error-message { color: red; margin-top: 1rem; text-align: center; }
.success-message { color: green; margin-top: 1rem; text-align: center; }
</style>
