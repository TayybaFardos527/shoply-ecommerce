<template>
  <router-link :to="`/product/${product.id}`" class="bg-white rounded-xl border hover:shadow-lg transition p-3 flex flex-col">
    <img :src="product.image" :alt="product.name" class="w-full h-40 object-cover rounded-lg mb-3" />
    <span class="text-xs text-brand-600 font-medium">{{ product.category }}</span>
    <h3 class="font-semibold text-gray-800 line-clamp-1">{{ product.name }}</h3>
    <p class="text-sm text-gray-500 line-clamp-2 flex-1">{{ product.description }}</p>
    <div class="flex items-center justify-between mt-3">
      <span class="font-bold text-lg">${{ product.price.toFixed(2) }}</span>
      <button @click.prevent="$emit('add', product)" class="bg-brand-600 text-white text-sm px-3 py-1.5 rounded-lg hover:bg-brand-700">
        Add to cart
      </button>
    </div>
  </router-link>
</template>

<script setup>
defineProps({ product: Object })
defineEmits(['add'])
</script>
