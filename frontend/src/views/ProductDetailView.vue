<template>
  <div class="detail-container">
    <div v-if="loading">Cargando producto...</div>
    <div v-else-if="error" class="error">Error: {{ error }}</div>
    <div v-else-if="product" class="detail">
      <img :src="product.imageUrl" :alt="product.name" class="detail-image" />
      <div class="detail-info">
        <h1>{{ product.name }}</h1>
        <p class="category">📁 Categoría: {{ categoryName }}</p>
        <p class="description">{{ product.description }}</p>
        <p class="price">💰 ${{ product.price }}</p>
        <p class="stock" :class="{ 'low-stock': product.stock < 5 }">📦 Stock: {{ product.stock }} unidades</p>
        <div class="actions">
          <input type="number" v-model.number="quantity" min="1" :max="product.stock" />
          <button @click="addToCart" :disabled="product.stock === 0">🛒 Añadir al Carrito</button>
          <router-link to="/" class="back">← Volver</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useCartStore } from '../stores/cartStore'

const route = useRoute()
const product = ref(null)
const categories = ref([])
const quantity = ref(1)
const loading = ref(true)
const error = ref(null)
const cartStore = useCartStore()

const categoryName = computed(() => {
  const cat = categories.value.find(c => c.id === product.value?.categoryId)
  return cat?.name || 'Sin categoría'
})

const addToCart = () => {
  cartStore.addToCart({ ...product.value, quantity: quantity.value })
  alert(`${product.value.name} añadido al carrito`)
}

onMounted(async () => {
  loading.value = true
  try {
    const id = route.params.id
    const resProduct = await fetch(`http://localhost:3000/api/products/${id}`)
    product.value = await resProduct.json()
    
    const resCategories = await fetch('http://localhost:3000/api/categories')
    categories.value = await resCategories.json()
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.detail { display: flex; gap: 40px; flex-wrap: wrap; }
.detail-image { width: 350px; border-radius: 10px; object-fit: cover; }
.detail-info { flex: 1; }
.price { font-size: 2rem; color: #667eea; font-weight: bold; }
.actions { display: flex; gap: 10px; margin-top: 20px; align-items: center; }
.actions input { width: 60px; padding: 8px; border: 1px solid #ddd; border-radius: 5px; }
.actions button, .back { padding: 10px 20px; background: #667eea; color: white; border: none; border-radius: 5px; cursor: pointer; text-decoration: none; display: inline-block; }
.back { background: #95a5a6; }
.low-stock { color: #e74c3c; }
.error { color: red; text-align: center; }
</style>