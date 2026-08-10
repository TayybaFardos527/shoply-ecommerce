<template>
  <div v-if="product" class="grid md:grid-cols-2 gap-8">
    <img :src="product.image" :alt="product.name" class="w-full rounded-xl object-cover max-h-[420px]" />
    <div>
      <span class="text-sm text-brand-600 font-medium">{{ product.category }}</span>
      <h1 class="text-2xl font-bold mb-2">{{ product.name }}</h1>
      <p class="text-gray-600 mb-4">{{ product.description }}</p>
      <p class="text-3xl font-bold mb-4">${{ product.price.toFixed(2) }}</p>
      <p class="text-sm mb-4" :class="product.stock > 0 ? 'text-green-600' : 'text-red-500'">
        {{ product.stock > 0 ? `${product.stock} in stock` : 'Out of stock' }}
      </p>

      <div class="flex items-center gap-3 mb-6">
        <input type="number" v-model.number="qty" min="1" :max="product.stock" class="w-20 border rounded-lg px-2 py-2" />
        <button
          :disabled="product.stock === 0"
          @click="addToCart"
          class="bg-brand-600 disabled:bg-gray-300 text-white px-5 py-2.5 rounded-lg hover:bg-brand-700"
        >Add to cart</button>
      </div>

      <router-link to="/" class="text-sm text-brand-600">&larr; Back to shop</router-link>
    </div>
  </div>
  <p v-else class="text-gray-400">Loading...</p>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import api from '../api/axios'
import { useCartStore } from '../stores/cart'

const route = useRoute()
const cart = useCartStore()
const product = ref(null)
const qty = ref(1)

async function load() {
  const { data } = await api.get(`/products/${route.params.id}`)
  product.value = data
}

function addToCart() {
  cart.addItem(product.value, qty.value)
}

onMounted(load)
</script>
