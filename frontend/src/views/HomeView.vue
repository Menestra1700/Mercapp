<template>
  <div>
    <h2>Productos</h2>
    <div v-if="loading">Cargando...</div>
    <div v-else-if="error">Error: {{ error }}</div>
    <div v-else>
      <div v-for="p in products" :key="p.id" style="border:1px solid #ccc; margin:10px; padding:10px">
        <h3>{{ p.name }}</h3>
        <p>${{ p.price }}</p>
        <button @click="addToCart(p)">Añadir</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useCartStore } from '../stores/cartStore'

const products = ref([])
const loading = ref(true)
const error = ref(null)
const cartStore = useCartStore()

const addToCart = (product) => {
  cartStore.addToCart(product)
  alert('Añadido: ' + product.name)
}

onMounted(async () => {
  try {
    const API_URL = 'https://mercapp-api-e0a7.onrender.com'
    const res = await fetch(`${API_URL}/api/products`)
    if (!res.ok) throw new Error('HTTP ' + res.status)
    products.value = await res.json()
    console.log('Productos cargados:', products.value)
  } catch (err) {
    error.value = err.message
    console.error('Error:', err)
  } finally {
    loading.value = false
  }
})
</script>