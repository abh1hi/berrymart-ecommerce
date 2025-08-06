
/* frontend/src/views/LoginView.vue */
// This is a new page component for handling user login.

/* frontend/src/views/LoginView.vue */
// Page component for handling user login.

/* frontend/src/views/LoginView.vue */
// Updated to fetch the user's profile and save their admin status on login.

/* frontend/src/views/LoginView.vue */
// Updated to redirect admins to the admin panel on login.

/* frontend/src/views/LoginView.vue */
// Updated to redirect admins to the admin panel on login.
<template>
  <div class="auth-form">
    <h2>Login</h2>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" v-model="email" id="email" required>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" v-model="password" id="password" required>
      </div>
      <div v-if="error" class="error-message">{{ error }}</div>
      <button type="submit">Login</button>
    </form>
    </div>
  </template>

<script>
import axios from 'axios';
export default {
  data() {
    return { email: '', password: '', error: '' };
  },
  methods: {
    async handleLogin() {
      try {
        const res = await axios.post('/api/users/login', { email: this.email, password: this.password });
        const token = res.data.token;
        localStorage.setItem('jwtToken', token);

        const profileRes = await axios.get('/api/users/me', { headers: { Authorization: token } });
        const isAdmin = profileRes.data.isAdmin;
        localStorage.setItem('isAdmin', isAdmin);

        window.dispatchEvent(new Event('storage'));
        
        if (isAdmin) {
          this.$router.push('/admin/users');
        } else {
          this.$router.push('/products');
        }
      } catch (err) {
        this.error = 'Invalid email or password.';
        console.error(err);
      }
    }
  }
};
</script>

<style scoped>
.auth-form { max-width: 400px; margin: 2rem auto; padding: 2rem; border: 1px solid #ddd; border-radius: 8px; background-color: white; }
.form-group { margin-bottom: 1rem; }
.form-group label { display: block; margin-bottom: 0.5rem; }
.form-group input { width: 100%; box-sizing: border-box; padding: 0.5rem; border-radius: 4px; border: 1px solid #ccc; }
button { width: 100%; padding: 0.75rem; background-color: #00f5a0; color: #1a202c; border: none; border-radius: 8px; font-weight: bold; cursor: pointer; }
.error-message { color: red; margin-bottom: 1rem; }
</style>
