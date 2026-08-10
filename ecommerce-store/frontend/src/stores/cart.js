import { defineStore } from 'pinia'

function loadCart() {
  try {
    return JSON.parse(localStorage.getItem('cart') || '[]')
  } catch {
    return []
  }
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: loadCart() // [{ id, name, price, image, qty }]
  }),
  getters: {
    count: (state) => state.items.reduce((sum, i) => sum + i.qty, 0),
    total: (state) => state.items.reduce((sum, i) => sum + i.qty * i.price, 0)
  },
  actions: {
    persist() {
      localStorage.setItem('cart', JSON.stringify(this.items))
    },
    addItem(product, qty = 1) {
      const existing = this.items.find(i => i.id === product.id)
      if (existing) {
        existing.qty += qty
      } else {
        this.items.push({ id: product.id, name: product.name, price: product.price, image: product.image, qty })
      }
      this.persist()
    },
    updateQty(id, qty) {
      const item = this.items.find(i => i.id === id)
      if (item) item.qty = Math.max(1, qty)
      this.persist()
    },
    removeItem(id) {
      this.items = this.items.filter(i => i.id !== id)
      this.persist()
    },
    clear() {
      this.items = []
      this.persist()
    }
  }
})
