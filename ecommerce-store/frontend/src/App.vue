<template>
  <div class="min-h-screen flex flex-col">
    <Navbar />
    <main class="flex-1 max-w-7xl mx-auto w-full px-4 py-6">
      <router-view />
    </main>
    <footer class="text-center text-sm text-gray-400 py-6 border-t">
      Built with Vue 3, Pinia, Tailwind &amp; Express — Shoply demo store
    </footer>
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue'
</script>
