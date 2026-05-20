import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import Stripe from "stripe";
import path from "path";

import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";

dotenv.config();

const app = express();

const stripe = process.env.STRIPE_SECRET_KEY? new Stripe(process.env.STRIPE_SECRET_KEY): null;

// Check required environment variables
if (!process.env.MONGO_URI || !process.env.JWT_SECRET) {
    console.warn(
    "⚠️ Missing required env vars. Expected MONGO_URI and JWT_SECRET."
);
}

if (!process.env.STRIPE_SECRET_KEY) {
    console.warn(
    "⚠️ STRIPE_SECRET_KEY missing. Payment endpoint will return 503."
    );
}

// Middleware
app.use(cors());
app.use(express.json());

// Health Check Route
app.get("/api/health", (req, res) => {
    res.json({
    status: "ok",
    mongodbReadyState: mongoose.connection.readyState,
    stripeConfigured: Boolean(process.env.STRIPE_SECRET_KEY),
});
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/contact", contactRoutes);

// Stripe Payment Route
app.post("/api/create-payment-intent", async (req, res) => {
    if (!stripe) {
    return res
        .status(503)
        .json({ error: "Stripe is not configured on server" });
}

    const { amount, cartItems, customerEmail } = req.body;

try {
    const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: "usd",
    receipt_email: customerEmail,
    metadata: {
        cart: JSON.stringify(cartItems || []),
    },
    });

    res.status(200).json({
    clientSecret: paymentIntent.client_secret,
    });
} catch (err) {
    console.error("Stripe Error:", err);

    res.status(500).json({
    error: err.message,
    });
    }
});

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
    const __dirname = path.resolve();

    const buildPath = path.join(__dirname, "frontend", "dist");

    app.use(express.static(buildPath));

    app.get("*", (req, res) => {
    res.sendFile(path.join(buildPath, "index.html"));
});
}

// MongoDB Connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB connected"))
    .catch((err) =>
    console.error("❌ MongoDB connection error:", err)
);

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
    console.log(`🚀 Server running on port ${PORT}`)
);