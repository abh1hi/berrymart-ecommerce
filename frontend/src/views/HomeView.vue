
/* frontend/src/views/HomeView.vue */
// This is the new Home Page component.

/* frontend/src/views/HomeView.vue */
// The Home Page component.
<template>
  <div class="home">
    <header class="app-header">
      <h1>Welcome to BerryMart</h1>
      <p>Your one-stop shop for the freshest products.</p>
      <router-link to="/products" class="cta-button">Shop Now</router-link>
    </header>
  </div>
</template>

<style scoped>
.app-header {
  background-color: #1a202c;
  min-height: 70vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
  border-radius: 12px;
  text-align: center;
}
.cta-button {
  margin-top: 2rem;
  background-color: #00f5a0;
  color: #1a202c;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-weight: bold;
  text-decoration: none;
  font-size: 1.2rem;
}
</style>
