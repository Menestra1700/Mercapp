<template>
  <div class="product-card">
    <img :src="product.imageUrl" :alt="product.name" class="product-image" />
    <div class="product-info">
      <h3>{{ product.name }}</h3>
      <p class="price">${{ product.price }}</p>
      <p class="stock" :class="{ 'low-stock': product.stock < 5 }">Stock: {{ product.stock }}</p>
      <div class="buttons">
        <button @click="$emit('add-to-cart', product)" :disabled="product.stock === 0">
          🛒 {{ product.stock === 0 ? 'Agotado' : 'Añadir' }}
        </button>
        <router-link :to="`/product/${product.id}`" class="details-btn">Ver Detalle</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps(['product'])
defineEmits(['add-to-cart'])
</script>

<style scoped>
.product-card {
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
  transition: transform 0.3s;
  background: white;
}
.product-card:hover { transform: translateY(-5px); box-shadow: 0 5px 15px rgba(0,0,0,0.1); }
.product-image { width: 100%; height: 180px; object-fit: cover; }
.product-info { padding: 15px; }
.price { font-size: 1.4rem; font-weight: bold; color: #667eea; }
.low-stock { color: #e74c3c; }
.buttons { display: flex; gap: 10px; margin-top: 10px; }
.buttons button, .details-btn { padding: 8px 15px; border: none; border-radius: 5px; cursor: pointer; text-decoration: none; display: inline-block; text-align: center; flex: 1; }
.buttons button { background: #667eea; color: white; }
.details-btn { background: #ecf0f1; color: #333; }
</style>