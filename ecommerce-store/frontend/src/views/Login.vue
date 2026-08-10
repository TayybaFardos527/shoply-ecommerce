<template>
  <div class="max-w-sm mx-auto bg-white border rounded-xl p-6">
    <h1 class="text-xl font-bold mb-4">Login</h1>
    <form @submit.prevent="submit" class="space-y-3">
      <input v-model="email" type="email" required placeholder="Email" class="w-full border rounded-lg px-3 py-2" />
      <input v-model="password" type="password" required placeholder="Password" class="w-full border rounded-lg px-3 py-2" />
      <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>
      <button type="submit" class="w-full bg-brand-600 text-white py-2.5 rounded-lg hover:bg-brand-700">Login</button>
    </form>
    <p class="text-sm text-gray-500 mt-4">No account? <router-link to="/register" class="text-brand-600">Register</router-link></p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const auth = useAuthStore()
const router = useRouter()
const route = useRoute()
const email = ref('')
const password = ref('')
const error = ref('')

async function submit() {
  error.value = ''
  try {
    await auth.login({ email: email.value, password: password.value })
    router.push(route.query.redirect || '/')
  } catch (e) {
    error.value = e.response?.data?.message || 'Login failed'
  }
}
</script>
