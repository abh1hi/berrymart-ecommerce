
/* frontend/src/router/index.js */
// This new file defines the application's routes.

/* frontend/src/router/index.js */
// Updated to include routes for Login, Register, and the Cart.

/* frontend/src/router/index.js */
// Updated to include routes for Checkout and Order Confirmation.
/* frontend/src/router/index.js */
// Defines all the application's routes.

/* frontend/src/router/index.js */
// CORRECTED: This file now includes all the necessary routes.
/* frontend/src/router/index.js */
// Updated to include protected admin routes.
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductsView from '../views/ProductsView.vue'
import ProductDetailView from '../views/ProductDetailView.vue'
import LoginView from '../views/LoginView.vue'
import CartView from '../views/CartView.vue'
import RegisterView from '../views/RegisterView.vue'
import CheckoutView from '../views/CheckoutView.vue'
import OrderConfirmationView from '../views/OrderConfirmationView.vue'
import MyOrdersView from '../views/MyOrdersView.vue'
import WishlistView from '../views/WishlistView.vue'
import ProfileView from '../views/ProfileView.vue'
// New Admin Views
import AdminDashboardView from '../views/admin/AdminDashboardView.vue'
import UserListView from '../views/admin/UserListView.vue'
import OrderListView from '../views/admin/OrderListView.vue'
// Admin Views
import CouponListView from '../views/admin/CouponListView.vue' // New
import CouponEditView from '../views/admin/CouponEditView.vue' // New
import ProductListView from '../views/admin/ProductListView.vue' // New
import ProductEditView from '../views/admin/ProductEditView.vue' // New
import OrderDetailView from '../views/admin/OrderDetailView.vue' // New
import ReturnListView from '../views/admin/ReturnListView.vue' // New
import BulkUploadView from '../views/admin/BulkUploadView.vue' // New
import AnalyticsView from '../views/admin/AnalyticsView.vue' // New





const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/products', name: 'products', component: ProductsView },
  { path: '/product/:id', name: 'ProductDetail', component: ProductDetailView },
  { path: '/login', name: 'login', component: LoginView },
  { path: '/register', name: 'register', component: RegisterView },
  { path: '/cart', name: 'cart', component: CartView },
  { path: '/checkout', name: 'checkout', component: CheckoutView },
  { path: '/order-confirmation/:id', name: 'OrderConfirmation', component: OrderConfirmationView },
  { path: '/my-orders', name: 'MyOrders', component: MyOrdersView },
  { path: '/wishlist', name: 'Wishlist', component: WishlistView },
  { path: '/profile', name: 'Profile', component: ProfileView },
  
  // Admin Routes
  {
    path: '/admin',
    component: AdminDashboardView,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('isAdmin') === 'true') {
        next();
      } else {
        next('/');
      }
    },
    children: [
      { path: 'users', name: 'AdminUserList', component: UserListView },
      { path: 'orders', name: 'AdminOrderList', component: OrderListView },
      { path: 'order/:id', name: 'AdminOrderDetail', component: OrderDetailView }, // New
       { path: 'products', name: 'AdminProductList', component: ProductListView }, // New
      { path: 'product/new', name: 'AdminProductCreate', component: ProductEditView }, // New
      { path: 'product/edit/:id', name: 'AdminProductEdit', component: ProductEditView }, // New
      { path: 'coupons', name: 'AdminCouponList', component: CouponListView }, // New
      { path: 'coupon/new', name: 'AdminCouponCreate', component: CouponEditView }, // New
      { path: 'coupon/edit/:id', name: 'AdminCouponEdit', component: CouponEditView }, // New
       { path: 'returns', name: 'AdminReturnList', component: ReturnListView }, // New
        { path: 'products/bulk-upload', name: 'AdminBulkUpload', component: BulkUploadView },
              { path: 'analytics', name: 'AdminAnalytics', component: AnalyticsView }, // New

    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router