<template>
  <div>
    <h2>Productos</h2>
    
    <div class="filters">
      <input type="text" v-model="searchTerm" placeholder="🔍 Buscar producto..." class="search" />
      
      <div class="categories">
        <button @click="selectedCategory = null" :class="{ active: selectedCategory === null }">Todos</button>
        <button v-for="cat in categories" :key="cat.id" @click="selectedCategory = cat.id" :class="{ active: selectedCategory === cat.id }">
          {{ cat.name }}
        </button>
      </div>
    </div>

    <div v-if="apiLoading">Cargando...</div>
    <div v-else-if="apiError" class="error">Error: {{ apiError }}</div>
    <div v-else class="products-grid">
      <ProductCard v-for="p in filteredProducts" :key="p.id" :product="p" @add-to-cart="addToCart" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import ProductCard from '../components/ProductCard.vue'
import { useApi } from '../composables/useApi'
import { useCartStore } from '../stores/cartStore'

const products = ref([])
const categories = ref([])
const searchTerm = ref('')
const selectedCategory = ref(null)
const { loading: apiLoading, error: apiError, fetchData } = useApi()
const cartStore = useCartStore()

const filteredProducts = computed(() => {
  let result = products.value
  if (searchTerm.value) {
    const term = searchTerm.value.toLowerCase()
    result = result.filter(p => p.name.toLowerCase().includes(term) || p.description?.toLowerCase().includes(term))
  }
  if (selectedCategory.value) {
    result = result.filter(p => p.categoryId === selectedCategory.value)
  }
  return result
})

const addToCart = (product) => {
  cartStore.addToCart(product)
  alert(`${product.name} añadido al carrito`)
}

onMounted(async () => {
  products.value = await fetchData('/api/products')
  categories.value = await fetchData('/api/categories')
})
</script>

<style scoped>
.filters { margin-bottom: 20px; }
.search { width: 100%; padding: 10px; margin-bottom: 15px; border: 2px solid #ddd; border-radius: 5px; font-size: 16px; }
.categories { display: flex; gap: 10px; flex-wrap: wrap; }
.categories button { padding: 8px 16px; border: 2px solid #ddd; background: white; border-radius: 20px; cursor: pointer; }
.categories button.active { background: #667eea; color: white; border-color: #667eea; }
.products-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; margin-top: 20px; }
.error { color: red; text-align: center; padding: 20px; }
</style>