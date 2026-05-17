import { createRouter, createWebHistory } from 'vue-router'

// Lazy loading de vistas
const HomeView = () => import('../views/HomeView.vue')
const CartView = () => import('../views/CartView.vue')
const AboutView = () => import('../views/AboutView.vue')
const ProductDetailView = () => import('../views/ProductDetailView.vue')
const ProductFormView = () => import('../views/ProductFormView.vue')
const NotFoundView = () => import('../views/NotFoundView.vue')

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/cart', name: 'cart', component: CartView },
  { path: '/about', name: 'about', component: AboutView },
  { path: '/product/:id', name: 'product-detail', component: ProductDetailView },
  { path: '/product/new', name: 'product-new', component: ProductFormView },
  { path: '/product/:id/edit', name: 'product-edit', component: ProductFormView },
  { path: '/404', name: 'not-found', component: NotFoundView },
  { path: '/:pathMatch(.*)*', redirect: '/404' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router