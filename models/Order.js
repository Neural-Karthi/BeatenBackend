const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  image: { type: String },
  size: { type: String },
  color: { type: String },
});

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderItems: [orderItemSchema],
    shippingAddress: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
      required: true,
    },
    paymentInfo: {
      id: { type: String },
      status: { type: String },
      method: { type: String },
      originalPrice: { type: Number }, // Store original price before discounts
    },
    totalPrice: { type: Number, required: true },
    coupon: {
      code: { type: String },
      discountType: { type: String, enum: ["percentage", "flat"] },
      discount: { type: Number },
      discountAmount: { type: Number }, // The amount discounted from total
    },
    subscriptionDiscount: {
      applied: { type: Boolean, default: false },
      amount: { type: Number, default: 0 }, // Amount deducted due to subscription
      subscriptionCost: { type: Number, default: 0 }, // User's subscription cost (249)
    },
    status: {
      type: String,
      // enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
