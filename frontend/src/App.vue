
/* frontend/src/App.vue */
// Updated to include the Navbar and the router view,
// which will render the current page's component.

/* frontend/src/App.vue */
// The main shell of the application.
<template>
  <div id="app">
    <Navbar />
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';

export default {
  components: {
    Navbar
  }
}
</script>

<style>
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #f7fafc;
}
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}
</style>
