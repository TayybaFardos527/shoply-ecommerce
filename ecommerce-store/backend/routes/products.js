import { Router } from 'express';
import { db } from '../db.js';
import { requireAuth, requireAdmin } from '../middleware/auth.js';

const router = Router();

// GET /api/products?search=&category=&sort=
router.get('/', async (req, res) => {
  await db.read();
  let items = [...db.data.products];
  const { search, category, sort } = req.query;

  if (search) {
    const q = search.toLowerCase();
    items = items.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
  }
  if (category && category !== 'All') {
    items = items.filter(p => p.category === category);
  }
  if (sort === 'price_asc') items.sort((a, b) => a.price - b.price);
  if (sort === 'price_desc') items.sort((a, b) => b.price - a.price);

  res.json(items);
});

router.get('/categories', async (req, res) => {
  await db.read();
  const categories = [...new Set(db.data.products.map(p => p.category))];
  res.json(categories);
});

router.get('/:id', async (req, res) => {
  await db.read();
  const product = db.data.products.find(p => p.id === Number(req.params.id));
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
});

router.post('/', requireAuth, requireAdmin, async (req, res) => {
  await db.read();
  const { name, category, price, stock, image, description } = req.body;
  if (!name || !price) return res.status(400).json({ message: 'Name and price are required' });
  const product = {
    id: Date.now(),
    name, category: category || 'General', price: Number(price),
    stock: Number(stock) || 0, image: image || 'https://picsum.photos/400/400',
    description: description || ''
  };
  db.data.products.push(product);
  await db.write();
  res.status(201).json(product);
});

router.put('/:id', requireAuth, requireAdmin, async (req, res) => {
  await db.read();
  const idx = db.data.products.findIndex(p => p.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ message: 'Product not found' });
  db.data.products[idx] = { ...db.data.products[idx], ...req.body, id: db.data.products[idx].id };
  await db.write();
  res.json(db.data.products[idx]);
});

router.delete('/:id', requireAuth, requireAdmin, async (req, res) => {
  await db.read();
  const before = db.data.products.length;
  db.data.products = db.data.products.filter(p => p.id !== Number(req.params.id));
  if (db.data.products.length === before) return res.status(404).json({ message: 'Product not found' });
  await db.write();
  res.status(204).end();
});

export default router;
