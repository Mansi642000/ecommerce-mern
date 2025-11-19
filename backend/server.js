import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import Stripe from "stripe";
import path from "path"; // Already imported, good.

// Import routes
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import contactRoutes from "./routes/contactRoutes.js"; // ✅ Added contact route

dotenv.config();

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// ---------- MIDDLEWARE ----------
app.use(cors());
app.use(express.json());

// ---------- API ROUTES ----------
app.use("/api/auth", authRoutes);          // Authentication routes
app.use("/api/products", productRoutes);   // Product CRUD routes
app.use("/api/orders", orderRoutes);       // Orders routes
app.use("/api/contact", contactRoutes);    // ✅ Contact form route

// ---------- STRIPE PAYMENT ENDPOINT ----------
app.post("/api/create-payment-intent", async (req, res) => {
  const { amount, cartItems, customerEmail } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      receipt_email: customerEmail,
      metadata: { cart: JSON.stringify(cartItems) },
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error("Stripe Error:", err);
    res.status(500).json({ error: err.message });
  }
});

// -----------------------------------------------------------------
// ---------- SERVE FRONTEND STATIC ASSETS (NEW CRITICAL BLOCK) ----------
if (process.env.NODE_ENV === "production") {
    // 1. Resolve the path for the current working directory (project root)
    const __dirname = path.resolve(); 
    
    // 2. Define the path to the built frontend files (Vite output is 'dist' inside 'frontend')
    const buildPath = path.join(__dirname, 'frontend', 'dist'); 

    // 3. Tell Express to serve the static assets (CSS, JS, images) from the build path
    app.use(express.static(buildPath));

    // 4. Catch-all route: For any request not hitting an API, serve the main index.html file
    app.get('*', (req, res) => {
        res.sendFile(path.join(buildPath, 'index.html'));
    });
}
// -----------------------------------------------------------------


// ---------- DATABASE CONNECTION ----------
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ---------- START SERVER ----------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));