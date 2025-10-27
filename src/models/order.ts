import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "Pending",
      enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
    },
    paymentMethod: {
      type: String,
      required: true,
      enum: ["COD", "Online"],
    },
    paymentStatus: {
      type: String,
      required: true,
      default: "Pending",
      enum: ["Pending", "Paid"],
    },
    paymentId: {
      type: String,
      required: true,
    },
    paymentSignature: {
      type: String,
      required: true,
    },
    paymentDate: {
      type: Date,
      required: true,
    },
    deliveryDate: {
      type: Date,
      required: true,
    },
    deliveryAddress: {
      type: String,
      required: true,
    },
    deliveryCity: {
      type: String,
      required: true,
    },
    deliveryState: {
      type: String,
      required: true,
    },
    deliveryCountry: {
      type: String,
      required: true,
    },
    deliveryPincode: {
      type: String,
      required: true,
    },
    deliveryPhone: {
      type: String,
      required: true,
    },
    deliveryEmail: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.models.Order || mongoose.model("Order", orderSchema);
