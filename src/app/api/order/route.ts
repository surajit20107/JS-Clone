import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Order from "@/models/order";
import Cart from "@/models/cart";
import redis from "@/lib/redis";

export async function POST(req: Request) {
  const { userId } = await req.json();

  try {
    await connectToDatabase();
    const userCart = await Cart.find({ userId }).populate("productId");

    if (!userCart || userCart.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    // Fetch quantities from Redis if available
    let redisCart: Record<string, string> = {};
    try {
      if (redis) {
        redisCart = await redis.hgetall(`cart:${userId}`);
      }
    } catch (error) {
      console.error("Redis error:", error);
      // Continue with MongoDB quantities if Redis fails
    }

    // Map cart items with Redis quantities and calculate total
    const products = userCart.map((item) => {
      const redisQty = redisCart[item.productId._id.toString()];
      const quantity = redisQty ? parseInt(redisQty) : item.quantity;

      return {
        product: item.productId._id,
        quantity,
      };
    });

    // Calculate total price using Redis quantities
    const totalPrice = userCart.reduce((sum, item) => {
      const redisQty = redisCart[item.productId._id.toString()];
      const quantity = redisQty ? parseInt(redisQty) : item.quantity;
      return sum + item.productId.price * quantity;
    }, 0);

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
    try {
      if (redis) {
        await redis.del(`cart:${userId}`);
      }
    } catch (error) {
      console.error("Redis cleanup error:", error);
      // Continue even if Redis cleanup fails
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

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 },
      );
    }

    await connectToDatabase();

    const orders = await Order.find({ userId }).populate("products.product");

    if (!orders) {
      return NextResponse.json({ error: "No orders found" }, { status: 404 });
    }

    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 },
    );
  }
}
