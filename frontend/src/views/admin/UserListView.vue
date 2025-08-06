
/* frontend/src/views/admin/UserListView.vue */
// This is a new page for admins to view all users.

/* frontend/src/views/admin/UserListView.vue */
// This page is for admins to view all users.
<template>
    <div>
        <h1>User Management</h1>
        <div v-if="loading">Loading users...</div>
        <table v-else class="data-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Admin</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in users" :key="user._id">
                    <td>{{ user._id }}</td>
                    <td>{{ user.name }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.isAdmin ? 'Yes' : 'No' }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return { users: [], loading: true };
    },
    async created() {
        const token = localStorage.getItem('jwtToken');
        try {
            const res = await axios.get('/api/admin/users', { headers: { Authorization: token } });
            this.users = res.data;
        } catch (error) {
            console.error('Failed to fetch users:', error);
        } finally {
            this.loading = false;
        }
    }
}
</script>

<style scoped>
.data-table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
.data-table th, .data-table td { border: 1px solid #ddd; padding: 0.75rem; text-align: left; }
.data-table th { background-color: #f7fafc; }
</style>
