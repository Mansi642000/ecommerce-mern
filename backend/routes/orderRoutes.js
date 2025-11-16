import express from 'express';
import Order from '../models/Order.js';

const router = express.Router();

// Place a new order
router.post('/', async (req, res) => {
  const { items, total, customerName, email, address } = req.body;
  const newOrder = new Order({ items, total, customerName, email, address });
  try {
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all orders (for admin)
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
