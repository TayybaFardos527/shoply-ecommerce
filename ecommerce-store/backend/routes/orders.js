import { Router } from 'express';
import { db } from '../db.js';
import { requireAuth, requireAdmin } from '../middleware/auth.js';

const router = Router();

// Create an order (checkout)
router.post('/', requireAuth, async (req, res) => {
  await db.read();
  const { items, shippingAddress } = req.body;
  if (!items || items.length === 0) return res.status(400).json({ message: 'Cart is empty' });

  let total = 0;
  const orderItems = [];
  for (const it of items) {
    const product = db.data.products.find(p => p.id === it.id);
    if (!product) continue;
    const qty = Math.min(it.qty, product.stock);
    if (qty <= 0) continue;
    total += product.price * qty;
    orderItems.push({ productId: product.id, name: product.name, price: product.price, qty, image: product.image });
    product.stock -= qty;
  }

  const order = {
    id: Date.now(),
    userId: req.user.id,
    userName: req.user.name,
    items: orderItems,
    total: Number(total.toFixed(2)),
    shippingAddress: shippingAddress || '',
    status: 'pending',
    createdAt: new Date().toISOString()
  };
  db.data.orders.push(order);
  await db.write();
  res.status(201).json(order);
});

// Get logged-in user's orders
router.get('/mine', requireAuth, async (req, res) => {
  await db.read();
  const orders = db.data.orders.filter(o => o.userId === req.user.id).sort((a, b) => b.id - a.id);
  res.json(orders);
});

// Admin: get all orders
router.get('/', requireAuth, requireAdmin, async (req, res) => {
  await db.read();
  const orders = [...db.data.orders].sort((a, b) => b.id - a.id);
  res.json(orders);
});

// Admin: update order status
router.put('/:id/status', requireAuth, requireAdmin, async (req, res) => {
  await db.read();
  const order = db.data.orders.find(o => o.id === Number(req.params.id));
  if (!order) return res.status(404).json({ message: 'Order not found' });
  order.status = req.body.status || order.status;
  await db.write();
  res.json(order);
});

export default router;
