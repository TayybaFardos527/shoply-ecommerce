<template>
  <div>
    <h1 class="text-2xl font-bold mb-6">Your Cart</h1>

    <p v-if="cart.items.length === 0" class="text-gray-400">
      Your cart is empty. <router-link to="/" class="text-brand-600">Continue shopping</router-link>
    </p>

    <div v-else class="grid md:grid-cols-3 gap-8">
      <div class="md:col-span-2 space-y-4">
        <div v-for="item in cart.items" :key="item.id" class="flex items-center gap-4 bg-white border rounded-xl p-3">
          <img :src="item.image" class="w-20 h-20 object-cover rounded-lg" />
          <div class="flex-1">
            <h3 class="font-semibold">{{ item.name }}</h3>
            <p class="text-gray-500 text-sm">${{ item.price.toFixed(2) }} each</p>
          </div>
          <input type="number" min="1" v-model.number="item.qty" @change="cart.updateQty(item.id, item.qty)" class="w-16 border rounded-lg px-2 py-1" />
          <span class="font-semibold w-20 text-right">${{ (item.price * item.qty).toFixed(2) }}</span>
          <button @click="cart.removeItem(item.id)" class="text-red-500 text-sm">Remove</button>
        </div>
      </div>

      <div class="bg-white border rounded-xl p-5 h-fit">
        <h2 class="font-semibold mb-4">Order Summary</h2>
        <div class="flex justify-between text-sm mb-2">
          <span>Subtotal</span><span>${{ cart.total.toFixed(2) }}</span>
        </div>
        <div class="flex justify-between text-sm mb-4 text-gray-400">
          <span>Shipping</span><span>Free</span>
        </div>
        <div class="flex justify-between font-bold text-lg border-t pt-3 mb-4">
          <span>Total</span><span>${{ cart.total.toFixed(2) }}</span>
        </div>
        <router-link to="/checkout" class="block text-center bg-brand-600 text-white py-2.5 rounded-lg hover:bg-brand-700">
          Checkout
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '../stores/cart'
const cart = useCartStore()
</script>
