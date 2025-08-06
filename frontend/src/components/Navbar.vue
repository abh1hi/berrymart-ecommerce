
/* frontend/src/components/Navbar.vue */
// Updated to show a Cart link and conditionally show Login/Logout.

/* frontend/src/components/Navbar.vue */
// The site's navigation bar component.

/* frontend/src/components/Navbar.vue */
// The site's navigation bar component.

/* frontend/src/components/Navbar.vue */
// Updated to include a "My Orders" link for logged-in users.

/* frontend/src/components/Navbar.vue */
// Updated to include a "Wishlist" link for logged-in users.

/* frontend/src/components/Navbar.vue */
// Updated to link to the Profile page instead of showing separate links.

/* frontend/src/components/Navbar.vue */
// Updated to show an "Admin" link if the user is an admin.
<template>
  <nav class="navbar">
    <router-link to="/" class="logo">
      <span>Meta</span><span class="logo-berry">Berry</span>
    </router-link>
    <div class="nav-links">
      <router-link to="/">Home</router-link>
      <router-link to="/products">Products</router-link>
    </div>
    <div class="nav-auth">
      <template v-if="isLoggedIn">
        <router-link v-if="isAdmin" to="/admin/users" class="admin-link">Admin</router-link>
        <router-link to="/profile">My Account</router-link>
        <router-link to="/cart">Cart</router-link>
        <a @click="logout" href="#">Logout</a>
      </template>
      <template v-else>
        <router-link to="/login">Login</router-link>
        <router-link to="/register" class="button">Sign Up</router-link>
      </template>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      isLoggedIn: false,
      isAdmin: false
    };
  },
  created() {
    this.updateUserStatus();
    window.addEventListener('storage', this.updateUserStatus);
  },
  beforeUnmount() {
    window.removeEventListener('storage', this.updateUserStatus);
  },
  methods: {
    updateUserStatus() {
      this.isLoggedIn = !!localStorage.getItem('jwtToken');
      this.isAdmin = localStorage.getItem('isAdmin') === 'true';
    },
    logout() {
      localStorage.removeItem('jwtToken');
      localStorage.removeItem('isAdmin');
      this.updateUserStatus();
      this.$router.push('/login');
    }
  }
}
</script>

<style scoped>
.admin-link { background-color: #e53e3e; padding: 0.5rem 1rem; border-radius: 8px; font-weight: bold; }
.navbar { display: flex; justify-content: space-between; align-items: center; background-color: #1a202c; padding: 1rem 2rem; color: white; }
.logo { font-size: 1.5rem; font-weight: bold; text-decoration: none; color: white; }
.logo-berry { color: #00f5a0; }
.nav-links a, .nav-auth a { color: white; text-decoration: none; margin: 0 1rem; cursor: pointer; }
.nav-auth a.button { background-color: #00f5a0; color: #1a202c; padding: 0.5rem 1rem; border-radius: 8px; font-weight: bold; }
</style>
