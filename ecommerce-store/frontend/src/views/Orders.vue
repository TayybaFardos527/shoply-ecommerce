<template>
  <div>
    <h1 class="text-2xl font-bold mb-6">My Orders</h1>
    <p v-if="orders.length === 0" class="text-gray-400">You haven't placed any orders yet.</p>
    <div v-else class="space-y-4">
      <div v-for="o in orders" :key="o.id" class="bg-white border rounded-xl p-4">
        <div class="flex justify-between items-center mb-2">
          <span class="font-semibold">Order #{{ o.id }}</span>
          <span class="text-xs px-2 py-1 rounded-full bg-gray-100 capitalize">{{ o.status }}</span>
        </div>
        <p class="text-sm text-gray-500 mb-2">{{ new Date(o.createdAt).toLocaleString() }}</p>
        <ul class="text-sm text-gray-600 mb-2">
          <li v-for="it in o.items" :key="it.productId">{{ it.qty }}x {{ it.name }} — ${{ (it.price * it.qty).toFixed(2) }}</li>
        </ul>
        <p class="font-bold">Total: ${{ o.total.toFixed(2) }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../api/axios'

const orders = ref([])

onMounted(async () => {
  const { data } = await api.get('/orders/mine')
  orders.value = data
})
</script>
