<template>
  <div>
    <nav>
      <router-link to="/">Inicio</router-link>
      <router-link to="/cart">Carrito ({{ cartCount }})</router-link>
      <router-link to="/about">Acerca de</router-link>
      <router-link to="/product/new" class="new-btn">+ Nuevo Producto</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useCartStore } from './stores/cartStore'

const cartStore = useCartStore()
const cartCount = computed(() => cartStore.totalItems)
</script>

<style>
nav { background: #667eea; padding: 1rem; display: flex; gap: 1rem; align-items: center; }
nav a { color: white; text-decoration: none; padding: 8px 15px; border-radius: 5px; }
nav a:hover { background: rgba(255,255,255,0.2); }
.new-btn { background: #2ecc71; }
</style>