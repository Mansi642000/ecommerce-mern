import express from "express";
import Order from "../models/Order.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, async (req, res) => {
  const { items, total, customerName, email, address } = req.body;

  if (!items?.length || !total || !customerName || !email || !address) {
    return res.status(400).json({ message: "Missing required order details" });
  }

  try {
    const newOrder = new Order({
      user: req.user.id,
      items,
      total,
      customerName,
      email,
      address,
      paymentStatus: "paid",
    });

    const savedOrder = await newOrder.save();
    return res.status(201).json(savedOrder);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

router.get("/my", protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
    return res.json(orders);
  } catch (err) {
      return res.status(500).json({ message: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;