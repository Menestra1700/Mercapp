<template>
  <div class="form-container">
    <h2>{{ isEdit ? 'Editar Producto' : 'Nuevo Producto' }}</h2>
    
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label>Nombre *</label>
        <input type="text" v-model="form.name" required />
      </div>
      
      <div class="form-group">
        <label>Descripción *</label>
        <textarea v-model="form.description" required></textarea>
      </div>
      
      <div class="form-group">
        <label>Precio * ($)</label>
        <input type="number" v-model="form.price" required min="0.01" step="0.01" />
      </div>
      
      <div class="form-group">
        <label>Categoría *</label>
        <select v-model="form.categoryId" required>
          <option value="">Seleccionar...</option>
          <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
        </select>
      </div>
      
      <div class="form-group">
        <label>Stock</label>
        <input type="number" v-model="form.stock" min="0" />
      </div>
      
      <div class="form-group">
        <label>URL de Imagen</label>
        <input type="url" v-model="form.imageUrl" placeholder="https://picsum.photos/300/200" />
      </div>
      
      <div class="form-actions">
        <button type="submit" :disabled="loading">{{ isEdit ? 'Actualizar' : 'Crear' }}</button>
        <button type="button" @click="$router.push('/')">Cancelar</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const isEdit = ref(false)
const loading = ref(false)
const categories = ref([])

const form = ref({
  name: '',
  description: '',
  price: 0,
  categoryId: '',
  stock: 0,
  imageUrl: 'https://picsum.photos/300/200'
})

const loadCategories = async () => {
  const res = await fetch('http://localhost:3000/api/categories')
  categories.value = await res.json()
}

const loadProduct = async () => {
  const id = route.params.id
  const res = await fetch(`http://localhost:3000/api/products/${id}`)
  const product = await res.json()
  form.value = product
}

const submitForm = async () => {
  if (form.value.price <= 0) {
    alert('El precio debe ser mayor a 0')
    return
  }
  
  loading.value = true
  try {
    const url = isEdit.value 
      ? `http://localhost:3000/api/products/${route.params.id}`
      : 'http://localhost:3000/api/products'
    
    const method = isEdit.value ? 'PUT' : 'POST'
    
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form.value)
    })
    
    if (res.ok) {
      alert(isEdit.value ? 'Producto actualizado' : 'Producto creado')
      router.push('/')
    }
  } catch (error) {
    alert('Error al guardar el producto')
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  await loadCategories()
  isEdit.value = route.name === 'product-edit'
  if (isEdit.value) {
    await loadProduct()
  }
})
</script>

<style scoped>
.form-container { max-width: 600px; margin: 0 auto; }
.form-group { margin-bottom: 15px; }
.form-group label { display: block; margin-bottom: 5px; font-weight: bold; }
.form-group input, .form-group select, .form-group textarea { width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 5px; }
.form-group textarea { min-height: 80px; }
.form-actions { display: flex; gap: 10px; margin-top: 20px; }
.form-actions button { padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer; }
.form-actions button[type="submit"] { background: #667eea; color: white; }
.form-actions button[type="button"] { background: #95a5a6; color: white; }
</style>