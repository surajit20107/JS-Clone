import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Order from "@/models/order";
import Cart from "@/models/cart";
import Product from "@/models/product";
import redis from "@/lib/redis";

export async function POST(req: Request) {
  const { userId } = await req.json();

  try {
    await connectToDatabase();
    const userCart = await Cart.find({ userId });

    if (!userCart || userCart.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    // Calculate total price from all cart items
    const totalPrice = userCart.reduce((sum, item) => sum + item.totalPrice, 0);

    // Map cart items to order products format
    const products = userCart.map((item) => ({
      product: item.productId,
      quantity: item.quantity,
    }));

    // Create new order with all required fields
    const newOrder = new Order({
      userId,
      products,
      totalPrice,
      status: "Pending",
      paymentMethod: "COD", // Default to Cash on Delivery
      paymentStatus: "Pending",
      paymentId: `PAY-${Date.now()}-${userId}`, // Generate unique payment ID
      paymentSignature: "", // Empty for COD orders
      paymentDate: new Date(),
      deliveryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      deliveryAddress: "Default Address", // Should be passed from frontend
      deliveryCity: "Default City",
      deliveryState: "Default State",
      deliveryCountry: "India",
      deliveryPincode: "000000",
      deliveryPhone: "0000000000",
      deliveryEmail: "user@example.com",
    });

    await newOrder.save();
    await Cart.deleteMany({ userId });
    
    // Clear cart cache if using Redis
    if (redis) {
      await redis.del(`cart:${userId}`);
    }
    
    return NextResponse.json(
      { message: "Order placed successfully", orderId: newOrder._id },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to place order" },
      { status: 500 },
    );
  }
}
