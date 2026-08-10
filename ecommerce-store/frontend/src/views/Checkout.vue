<template>
  <div class="max-w-lg mx-auto">
    <h1 class="text-2xl font-bold mb-6">Checkout</h1>

    <div v-if="success" class="bg-green-50 border border-green-200 text-green-700 rounded-xl p-6 text-center">
      <p class="font-semibold mb-2">Order placed successfully! 🎉</p>
      <p class="text-sm mb-4">Order #{{ success.id }} — Total ${{ success.total.toFixed(2) }}</p>
      <router-link to="/orders" class="text-brand-600 underline">View my orders</router-link>
    </div>

    <form v-else @submit.prevent="placeOrder" class="bg-white border rounded-xl p-6 space-y-4">
      <div>
        <label class="block text-sm font-medium mb-1">Shipping Address</label>
        <textarea v-model="address" required rows="3" class="w-full border rounded-lg px-3 py-2" placeholder="Street, City, Country"></textarea>
      </div>

      <div class="border-t pt-4">
        <div class="flex justify-between font-bold text-lg">
          <span>Total</span><span>${{ cart.total.toFixed(2) }}</span>
        </div>
      </div>

      <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>

      <button type="submit" :disabled="loading" class="w-full bg-brand-600 disabled:bg-gray-300 text-white py-2.5 rounded-lg hover:bg-brand-700">
        {{ loading ? 'Placing order...' : 'Place order' }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import api from '../api/axios'
import { useCartStore } from '../stores/cart'

const cart = useCartStore()
const address = ref('')
const loading = ref(false)
const error = ref('')
const success = ref(null)

async function placeOrder() {
  loading.value = true
  error.value = ''
  try {
    const { data } = await api.post('/orders', {
      items: cart.items.map(i => ({ id: i.id, qty: i.qty })),
      shippingAddress: address.value
    })
    success.value = data
    cart.clear()
  } catch (e) {
    error.value = e.response?.data?.message || 'Failed to place order'
  } finally {
    loading.value = false
  }
}
</script>
