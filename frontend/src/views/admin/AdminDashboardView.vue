
/* frontend/src/views/admin/AdminDashboardView.vue */
// This is a new file for the main admin layout/dashboard.

/* frontend/src/views/admin/AdminDashboardView.vue */
// This is the main admin layout/dashboard.

/* frontend/src/views/admin/AdminDashboardView.vue */
// Updated to include a link to the new "Manage Products" page.

/* frontend/src/views/admin/AdminDashboardView.vue */
// Updated to include a link to the new "Manage Coupons" page.
<template>
    <div class="admin-layout">
        <aside class="admin-sidebar">
            <h2>Admin Menu</h2>
            <nav>
                <router-link to="/admin/analytics">Dashboard</router-link>
                <router-link to="/admin/users">Manage Users</router-link>
                <router-link to="/admin/orders">Manage Orders</router-link>
                <router-link to="/admin/products">Manage Products</router-link>
                <router-link to="/admin/coupons">Manage Coupons</router-link>
                <router-link to="/admin/returns">Manage Returns</router-link>
            </nav>
        </aside>
        <main class="admin-content">
            <router-view />
        </main>
    </div>
</template>

<style scoped>
.admin-layout { display: flex; }
.admin-sidebar { flex: 0 0 250px; background-color: #1a202c; color: white; padding: 1rem; min-height: calc(100vh - 80px); }
.admin-sidebar h2 { margin-top: 0; }
.admin-sidebar nav { display: flex; flex-direction: column; }
.admin-sidebar a { color: white; text-decoration: none; padding: 0.75rem 1rem; border-radius: 8px; }
.admin-sidebar a.router-link-exact-active { background-color: #00f5a0; color: #1a202c; }
.admin-content { flex-grow: 1; padding: 2rem; }
</style>
