import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const file = path.join(__dirname, 'data.json');
const adapter = new JSONFile(file);
const defaultData = { users: [], products: [], orders: [] };
export const db = new Low(adapter, defaultData);

export async function initDB() {
  await db.read();
  db.data ||= defaultData;
  if (db.data.products.length === 0) {
    db.data.products = [
      { id: 1, name: 'Wireless Headphones', category: 'Electronics', price: 59.99, stock: 25, image: 'https://picsum.photos/seed/headphones/400/400', description: 'Over-ear wireless headphones with noise cancellation and 30-hour battery life.' },
      { id: 2, name: 'Smart Watch', category: 'Electronics', price: 129.99, stock: 15, image: 'https://picsum.photos/seed/smartwatch/400/400', description: 'Fitness tracking smart watch with heart-rate monitor and GPS.' },
      { id: 3, name: 'Running Shoes', category: 'Footwear', price: 74.5, stock: 40, image: 'https://picsum.photos/seed/shoes/400/400', description: 'Lightweight breathable running shoes for daily training.' },
      { id: 4, name: 'Leather Backpack', category: 'Accessories', price: 89.0, stock: 20, image: 'https://picsum.photos/seed/backpack/400/400', description: 'Durable leather backpack with padded laptop compartment.' },
      { id: 5, name: 'Ceramic Coffee Mug Set', category: 'Home', price: 24.99, stock: 60, image: 'https://picsum.photos/seed/mugs/400/400', description: 'Set of 4 handcrafted ceramic mugs.' },
      { id: 6, name: 'Yoga Mat', category: 'Sports', price: 34.99, stock: 35, image: 'https://picsum.photos/seed/yogamat/400/400', description: 'Non-slip eco-friendly yoga mat, 6mm thick.' },
      { id: 7, name: 'Desk Lamp', category: 'Home', price: 42.0, stock: 18, image: 'https://picsum.photos/seed/desklamp/400/400', description: 'Adjustable LED desk lamp with 3 brightness modes.' },
      { id: 8, name: 'Bluetooth Speaker', category: 'Electronics', price: 45.99, stock: 30, image: 'https://picsum.photos/seed/speaker/400/400', description: 'Portable waterproof Bluetooth speaker with deep bass.' },
      { id: 9, name: 'Denim Jacket', category: 'Apparel', price: 65.0, stock: 22, image: 'https://picsum.photos/seed/jacket/400/400', description: 'Classic fit denim jacket for all seasons.' },
      { id: 10, name: 'Stainless Water Bottle', category: 'Sports', price: 19.99, stock: 50, image: 'https://picsum.photos/seed/bottle/400/400', description: 'Insulated stainless steel water bottle, keeps drinks cold 24h.' },
      { id: 11, name: 'Sunglasses', category: 'Accessories', price: 29.99, stock: 45, image: 'https://picsum.photos/seed/sunglasses/400/400', description: 'UV-protection polarized sunglasses.' },
      { id: 12, name: 'Mechanical Keyboard', category: 'Electronics', price: 79.99, stock: 12, image: 'https://picsum.photos/seed/keyboard/400/400', description: 'RGB backlit mechanical keyboard with blue switches.' }
    ];
    await db.write();
  }
}
