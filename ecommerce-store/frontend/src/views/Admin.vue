<template>
  <div>
    <h1 class="text-2xl font-bold mb-6">Admin Dashboard</h1>

    <div class="flex gap-4 mb-6 text-sm font-medium border-b">
      <button @click="tab = 'products'" :class="tabClass('products')">Products</button>
      <button @click="tab = 'orders'" :class="tabClass('orders')">Orders</button>
    </div>

    <!-- PRODUCTS TAB -->
    <div v-if="tab === 'products'">
      <button @click="openNewForm" class="mb-4 bg-brand-600 text-white px-4 py-2 rounded-lg text-sm">+ Add product</button>

      <form v-if="showForm" @submit.prevent="saveProduct" class="bg-white border rounded-xl p-4 mb-6 grid sm:grid-cols-2 gap-3">
        <input v-model="form.name" required placeholder="Name" class="border rounded-lg px-3 py-2" />
        <input v-model="form.category" placeholder="Category" class="border rounded-lg px-3 py-2" />
        <input v-model.number="form.price" required type="number" step="0.01" placeholder="Price" class="border rounded-lg px-3 py-2" />
        <input v-model.number="form.stock" type="number" placeholder="Stock" class="border rounded-lg px-3 py-2" />
        <input v-model="form.image" placeholder="Image URL" class="border rounded-lg px-3 py-2 sm:col-span-2" />
        <textarea v-model="form.description" placeholder="Description" class="border rounded-lg px-3 py-2 sm:col-span-2"></textarea>
        <div class="sm:col-span-2 flex gap-2">
          <button type="submit" class="bg-brand-600 text-white px-4 py-2 rounded-lg text-sm">{{ form.id ? 'Update' : 'Create' }}</button>
          <button type="button" @click="showForm = false" class="px-4 py-2 rounded-lg text-sm border">Cancel</button>
        </div>
      </form>

      <table class="w-full text-sm bg-white border rounded-xl overflow-hidden">
        <thead class="bg-gray-50 text-left">
          <tr><th class="p-3">Name</th><th class="p-3">Category</th><th class="p-3">Price</th><th class="p-3">Stock</th><th class="p-3"></th></tr>
        </thead>
        <tbody>
          <tr v-for="p in products" :key="p.id" class="border-t">
            <td class="p-3">{{ p.name }}</td>
            <td class="p-3">{{ p.category }}</td>
            <td class="p-3">${{ p.price.toFixed(2) }}</td>
            <td class="p-3">{{ p.stock }}</td>
            <td class="p-3 text-right space-x-2">
              <button @click="editProduct(p)" class="text-brand-600">Edit</button>
              <button @click="deleteProduct(p.id)" class="text-red-500">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- ORDERS TAB -->
    <div v-else>
      <div class="grid sm:grid-cols-3 gap-4 mb-6">
        <div class="bg-white border rounded-xl p-4">
          <p class="text-gray-400 text-sm">Total Orders</p>
          <p class="text-2xl font-bold">{{ orders.length }}</p>
        </div>
        <div class="bg-white border rounded-xl p-4">
          <p class="text-gray-400 text-sm">Total Revenue</p>
          <p class="text-2xl font-bold">${{ revenue.toFixed(2) }}</p>
        </div>
        <div class="bg-white border rounded-xl p-4">
          <p class="text-gray-400 text-sm">Pending Orders</p>
          <p class="text-2xl font-bold">{{ orders.filter(o => o.status === 'pending').length }}</p>
        </div>
      </div>

      <table class="w-full text-sm bg-white border rounded-xl overflow-hidden">
        <thead class="bg-gray-50 text-left">
          <tr><th class="p-3">Order</th><th class="p-3">Customer</th><th class="p-3">Total</th><th class="p-3">Status</th></tr>
        </thead>
        <tbody>
          <tr v-for="o in orders" :key="o.id" class="border-t">
            <td class="p-3">#{{ o.id }}</td>
            <td class="p-3">{{ o.userName }}</td>
            <td class="p-3">${{ o.total.toFixed(2) }}</td>
            <td class="p-3">
              <select :value="o.status" @change="updateStatus(o, $event.target.value)" class="border rounded-lg px-2 py-1">
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
              </select>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import api from '../api/axios'

const tab = ref('products')
const products = ref([])
const orders = ref([])
const showForm = ref(false)
const form = ref(emptyForm())

function emptyForm() {
  return { id: null, name: '', category: '', price: 0, stock: 0, image: '', description: '' }
}

function tabClass(name) {
  return ['pb-2 px-1', tab.value === name ? 'border-b-2 border-brand-600 text-brand-600' : 'text-gray-500']
}

const revenue = computed(() => orders.value.reduce((sum, o) => sum + o.total, 0))

async function loadProducts() {
  const { data } = await api.get('/products')
  products.value = data
}

async function loadOrders() {
  const { data } = await api.get('/orders')
  orders.value = data
}

function openNewForm() {
  form.value = emptyForm()
  showForm.value = true
}

function editProduct(p) {
  form.value = { ...p }
  showForm.value = true
}

async function saveProduct() {
  if (form.value.id) {
    await api.put(`/products/${form.value.id}`, form.value)
  } else {
    await api.post('/products', form.value)
  }
  showForm.value = false
  await loadProducts()
}

async function deleteProduct(id) {
  if (!confirm('Delete this product?')) return
  await api.delete(`/products/${id}`)
  await loadProducts()
}

async function updateStatus(order, status) {
  await api.put(`/orders/${order.id}/status`, { status })
  await loadOrders()
}

onMounted(() => {
  loadProducts()
  loadOrders()
})
</script>
