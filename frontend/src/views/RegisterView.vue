
/* frontend/src/views/RegisterView.vue */
// This is a new page component for handling user registration.

/* frontend/src/views/RegisterView.vue */
// Page component for handling user registration.
<template>
  <div class="auth-form">
    <h2>Create Account</h2>
    <form @submit.prevent="handleRegister">
        <div class="form-group">
            <label for="name">Name</label>
            <input type="text" v-model="name" id="name" required>
        </div>
        <div class="form-group">
            <label for="email">Email</label>
            <input type="email" v-model="email" id="email" required>
        </div>
        <div class="form-group">
            <label for="password">Password</label>
            <input type="password" v-model="password" id="password" required>
        </div>
        <div v-if="error" class="error-message">{{ error }}</div>
        <button type="submit">Sign Up</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return { name: '', email: '', password: '', error: '' };
  },
  methods: {
    async handleRegister() {
      try {
        await axios.post('/api/users/register', { name: this.name, email: this.email, password: this.password });
        this.$router.push('/login');
      } catch (err) {
        this.error = 'Failed to register. Email may already be in use.';
        console.error(err);
      }
    }
  }
};
</script>

<style scoped>
/* Using the same styles as the login form */
.auth-form { max-width: 400px; margin: 2rem auto; padding: 2rem; border: 1px solid #ddd; border-radius: 8px; background-color: white; }
.form-group { margin-bottom: 1rem; }
.form-group label { display: block; margin-bottom: 0.5rem; }
.form-group input { width: 100%; box-sizing: border-box; padding: 0.5rem; border-radius: 4px; border: 1px solid #ccc; }
button { width: 100%; padding: 0.75rem; background-color: #00f5a0; color: #1a202c; border: none; border-radius: 8px; font-weight: bold; cursor: pointer; }
.error-message { color: red; margin-bottom: 1rem; }
</style>
