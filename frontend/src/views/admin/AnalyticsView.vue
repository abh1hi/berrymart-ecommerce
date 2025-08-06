
/* frontend/src/views/admin/AnalyticsView.vue */
// This is a new page for the admin analytics dashboard.
<template>
    <div>
        <h1>Analytics Dashboard</h1>
        <div v-if="loading">Loading stats...</div>
        <div v-else class="stats-grid">
            <div class="stat-card">
                <h3>Total Sales</h3>
                <p>${{ stats.totalSales.toFixed(2) }}</p>
            </div>
            <div class="stat-card">
                <h3>Total Orders</h3>
                <p>{{ stats.totalOrders }}</p>
            </div>
            <div class="stat-card">
                <h3>Total Users</h3>
                <p>{{ stats.totalUsers }}</p>
            </div>
            <div class="stat-card">
                <h3>Total Products</h3>
                <p>{{ stats.totalProducts }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            stats: {
                totalSales: 0,
                totalOrders: 0,
                totalUsers: 0,
                totalProducts: 0
            },
            loading: true
        };
    },
    async created() {
        const token = localStorage.getItem('jwtToken');
        try {
            const res = await axios.get('/api/admin/analytics/stats', { headers: { Authorization: token } });
            this.stats = res.data;
        } catch (error) {
            console.error('Failed to fetch stats:', error);
        } finally {
            this.loading = false;
        }
    }
}
</script>

<style scoped>
.stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
    margin-top: 2rem;
}
.stat-card {
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 1.5rem;
    text-align: center;
}
.stat-card h3 {
    margin: 0 0 0.5rem 0;
    font-size: 1.1rem;
    color: #555;
}
.stat-card p {
    margin: 0;
    font-size: 2.5rem;
    font-weight: bold;
    color: #00f5a0;
}
</style>