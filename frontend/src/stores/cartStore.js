import { ref, computed } from 'vue'

export function useCartStore() {
  const cart = ref([])

  // Cargar carrito guardado
  const loadCart = () => {
    const saved = localStorage.getItem('cart')
    if (saved) {
      try {
        cart.value = JSON.parse(saved)
      } catch (e) {
        cart.value = []
      }
    }
  }

  // Guardar carrito
  const saveCart = () => {
    localStorage.setItem('cart', JSON.stringify(cart.value))
  }

  // Añadir producto
  const addToCart = (product) => {
    const existing = cart.value.find(item => item.id === product.id)
    if (existing) {
      existing.quantity += 1
    } else {
      cart.value.push({
        id: product.id,
        name: product.name,
        price: Number(product.price),
        quantity: 1
      })
    }
    saveCart()
  }

  // Eliminar producto
  const removeFromCart = (id) => {
    cart.value = cart.value.filter(item => item.id !== id)
    saveCart()
  }

  // Actualizar cantidad
  const updateQuantity = (id, quantity) => {
    const item = cart.value.find(item => item.id === id)
    if (item) {
      if (quantity <= 0) {
        removeFromCart(id)
      } else {
        item.quantity = quantity
        saveCart()
      }
    }
  }

  // Vaciar carrito
  const clearCart = () => {
    cart.value = []
    saveCart()
  }

  // Total de items
  const totalItems = computed(() => {
    return cart.value.reduce((sum, item) => sum + (item.quantity || 0), 0)
  })

  // Total a pagar
  const totalPrice = computed(() => {
    const total = cart.value.reduce((sum, item) => sum + ((item.price || 0) * (item.quantity || 0)), 0)
    return total
  })

  loadCart()

  return {
    cart,
    totalItems,
    totalPrice,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart
  }
}