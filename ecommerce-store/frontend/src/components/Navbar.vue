<template>
  <header class="bg-white border-b sticky top-0 z-10">
    <div class="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
      <router-link to="/" class="text-xl font-bold text-brand-600">Shoply</router-link>

      <input
        v-model="search"
        @keyup.enter="doSearch"
        type="text"
        placeholder="Search products..."
        class="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
      />

      <nav class="flex items-center gap-4 text-sm font-medium">
        <router-link to="/cart" class="relative">
          Cart
          <span v-if="cart.count" class="absolute -top-2 -right-3 bg-brand-600 text-white text-xs rounded-full px-1.5">{{ cart.count }}</span>
        </router-link>

        <template v-if="auth.isLoggedIn">
          <router-link to="/orders">Orders</router-link>
          <router-link v-if="auth.isAdmin" to="/admin">Admin</router-link>
          <span class="text-gray-400">|</span>
          <span class="text-gray-500">Hi, {{ auth.user.name }}</span>
          <button @click="logout" class="text-red-500">Logout</button>
        </template>
        <template v-else>
          <router-link to="/login">Login</router-link>
          <router-link to="/register" class="bg-brand-600 text-white px-3 py-1.5 rounded-lg">Sign up</router-link>
        </template>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/cart'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const cart = useCartStore()
const auth = useAuthStore()
const search = ref('')

function doSearch() {
  router.push({ path: '/', query: { search: search.value } })
}

function logout() {
  auth.logout()
  router.push('/')
}
</script>
