<template>
  <div>
    <div class="flex flex-wrap items-center gap-3 mb-6">
      <button
        v-for="cat in ['All', ...categories]" :key="cat"
        @click="setCategory(cat)"
        :class="['px-3 py-1.5 rounded-full text-sm border', activeCategory === cat ? 'bg-brand-600 text-white border-brand-600' : 'bg-white text-gray-600']"
      >{{ cat }}</button>

      <select v-model="sort" @change="fetchProducts" class="ml-auto border rounded-lg px-3 py-1.5 text-sm">
        <option value="">Sort: Featured</option>
        <option value="price_asc">Price: Low to High</option>
        <option value="price_desc">Price: High to Low</option>
      </select>
    </div>

    <p v-if="loading" class="text-gray-400">Loading products...</p>
    <p v-else-if="products.length === 0" class="text-gray-400">No products found.</p>

    <div v-else class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      <ProductCard v-for="p in products" :key="p.id" :product="p" @add="addToCart" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import api from '../api/axios'
import ProductCard from '../components/ProductCard.vue'
import { useCartStore } from '../stores/cart'

const route = useRoute()
const cart = useCartStore()

const products = ref([])
const categories = ref([])
const activeCategory = ref('All')
const sort = ref('')
const loading = ref(false)

async function fetchCategories() {
  const { data } = await api.get('/products/categories')
  categories.value = data
}

async function fetchProducts() {
  loading.value = true
  try {
    const { data } = await api.get('/products', {
      params: { search: route.query.search || '', category: activeCategory.value, sort: sort.value }
    })
    products.value = data
  } finally {
    loading.value = false
  }
}

function setCategory(cat) {
  activeCategory.value = cat
  fetchProducts()
}

function addToCart(product) {
  cart.addItem(product, 1)
}

watch(() => route.query.search, fetchProducts)

onMounted(() => {
  fetchCategories()
  fetchProducts()
})
</script>
