<template>
  <div class="cart-container">
    <h2>Mi Carrito</h2>
    
    <div v-if="cart.length === 0" class="empty-cart">
      <p>🛒 El carrito está vacío</p>
      <router-link to="/" class="btn-shop">Ir a comprar</router-link>
    </div>
    
    <div v-else>
      <table class="cart-table">
        <thead>
          <tr><th>Producto</th><th>Precio</th><th>Cantidad</th><th>Subtotal</th><th></th></tr>
        </thead>
        <tbody>
          <tr v-for="item in cart" :key="item.id">
            <td>{{ item.name }}</td>
            <td>${{ Number(item.price).toFixed(2) }}</td>
            <td>
              <button @click="updateQuantity(item.id, item.quantity - 1)" class="qty-btn">-</button>
              <span class="qty">{{ item.quantity }}</span>
              <button @click="updateQuantity(item.id, item.quantity + 1)" class="qty-btn">+</button>
            </td>
            <td>${{ (item.price * item.quantity).toFixed(2) }}</td>
            <td><button @click="removeFromCart(item.id)" class="remove-btn">Eliminar</button></td>
          </tr>
        </tbody>
      </table>
      
      <div class="cart-total">
        <h3>Total: ${{ totalPrice.toFixed(2) }}</h3>
        <button @click="clearCart" class="clear-btn">Vaciar Carrito</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '../stores/cartStore'

const store = useCartStore()
const { cart, totalPrice, removeFromCart, updateQuantity, clearCart } = store
</script>

<style scoped>
.cart-container { max-width: 800px; margin: 0 auto; }
.cart-table { width: 100%; border-collapse: collapse; }
.cart-table th, .cart-table td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
.qty-btn { width: 30px; height: 30px; margin: 0 5px; cursor: pointer; }
.qty { display: inline-block; width: 30px; text-align: center; }
.remove-btn { background: #e74c3c; color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer; }
.cart-total { margin-top: 20px; text-align: right; }
.clear-btn { background: #e74c3c; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; margin-left: 10px; }
.btn-shop { background: #667eea; color: white; padding: 10px 20px; border-radius: 5px; text-decoration: none; display: inline-block; }
.empty-cart { text-align: center; padding: 50px; }
</style>