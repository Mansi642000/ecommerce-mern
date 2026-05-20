import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
      },
    ],
    total: { type: Number, required: true },
    customerName: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    paymentStatus: { type: String, enum: ["pending", "paid"], default: "pending" },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
