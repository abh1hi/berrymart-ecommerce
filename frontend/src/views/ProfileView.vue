
/* frontend/src/views/ProfileView.vue */
// This is a new page to display the user's profile and quick links.
<template>
  <div class="profile-view">
    <h1>My Account</h1>
    <div v-if="loading">Loading profile...</div>
    <div v-else-if="user" class="profile-details">
      <div class="profile-info">
        <h2>Profile Information</h2>
        <p><strong>Name:</strong> {{ user.name }}</p>
        <p><strong>Email:</strong> {{ user.email }}</p>
      </div>
      <div class="quick-links">
        <h2>Quick Links</h2>
        <router-link to="/my-orders" class="quick-link-card">
          My Orders
        </router-link>
        <router-link to="/wishlist" class="quick-link-card">
          My Wishlist
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      user: null,
      loading: true,
    };
  },
  async created() {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      this.$router.push('/login');
      return;
    }
    try {
      const res = await axios.get('/api/users/me', {
        headers: { Authorization: token }
      });
      this.user = res.data;
    } catch (error) {
      console.error('Error fetching user profile:', error);
    } finally {
      this.loading = false;
    }
  }
};
</script>

<style scoped>
.profile-details {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}
.profile-info, .quick-links {
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1.5rem;
}
.quick-link-card {
  display: block;
  background-color: #f7fafc;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 8px;
  text-decoration: none;
  color: #1a202c;
  font-weight: bold;
  transition: background-color 0.3s;
}
.quick-link-card:hover {
  background-color: #e2e8f0;
}
</style>
