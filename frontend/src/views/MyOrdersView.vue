
/* frontend/src/views/MyOrdersView.vue */
// This is a new page to display the user's order history.

/* frontend/src/views/MyOrdersView.vue */
// CORRECTED: The v-if condition now safely handles old orders.
/* frontend/src/views/MyOrdersView.vue */
// CORRECTED: Safely handles orders where a product has been deleted.
<template>
  <div class="my-orders-view">
    <h1>My Orders</h1>
    <div v-if="loading">Loading your orders...</div>
    <div v-else-if="orders.length === 0">You haven't placed any orders yet.</div>
    <div v-else class="order-list">
      <div v-for="order in orders" :key="order._id" class="order-card">
        <div class="order-header">
          <h3>Order ID: {{ order._id }}</h3>
          <span>Placed on: {{ new Date(order.date).toLocaleDateString() }}</span>
        </div>
        <div class="order-items">
          <div v-for="item in order.items" :key="item.product._id" class="order-item">
            <span>{{ item.product.name }} (x{{ item.quantity }})</span>
            <span>${{ (item.price * item.quantity).toFixed(2) }}</span>
          </div>
        </div>
        <div class="order-footer">
            <strong>Total: ${{ order.total.toFixed(2) }}</strong>
            <button v-if="!order.returnDetails || !order.returnDetails.isRequested" @click="requestReturn(order._id)" class="return-btn">Request Return</button>
            <span v-else class="return-status">Return {{ order.returnDetails.status }}</span>
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
      orders: [],
      loading: true,
    };
  },
  async created() {
    this.fetchOrders();
  },
  methods: {
      async fetchOrders() {
        const token = localStorage.getItem('jwtToken');
        if (!token) { this.$router.push('/login'); return; }
        try {
            const res = await axios.get('/api/orders', { headers: { Authorization: token } });
            // Filter out any items where the product may have been deleted
            const cleanedOrders = res.data.map(order => {
                order.items = order.items.filter(item => item.product);
                return order;
            });
            this.orders = cleanedOrders;
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            this.loading = false;
        }
      },
      async requestReturn(orderId) {
          const reason = prompt('Please provide a reason for the return:');
          if (reason) {
              const token = localStorage.getItem('jwtToken');
              try {
                  await axios.post(`/api/returns/${orderId}`, { reason }, { headers: { Authorization: token } });
                  this.fetchOrders(); // Refresh the list to show the updated status
              } catch (error) {
                  console.error('Failed to request return:', error);
                  alert('There was an error submitting your return request.');
              }
          }
      }
  }
};
</script>

<style scoped>
.order-list { display: flex; flex-direction: column; gap: 1.5rem; }
.order-card { background-color: white; border: 1px solid #ddd; border-radius: 8px; padding: 1.5rem; }
.order-header { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #eee; padding-bottom: 1rem; margin-bottom: 1rem; }
.order-item { display: flex; justify-content: space-between; margin-bottom: 0.5rem; }
.order-footer { display: flex; justify-content: space-between; align-items: center; margin-top: 1rem; font-size: 1.2rem; }
.return-btn { background-color: #e2e8f0; color: #1a202c; padding: 0.5rem 1rem; border: none; border-radius: 8px; font-weight: bold; cursor: pointer; }
.return-status { font-size: 1rem; font-style: italic; color: #555; }
</style>