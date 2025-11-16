import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Order from "@/models/order";
import Cart from "@/models/cart";

export async function POST(req: Request) {
  const { userId } = await req.json();

  try {
    await connectToDatabase();
    const userCart = await Cart.find({ userId });

    if (!userCart || userCart.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    const orderItems = userCart.map((item) => {
      return {
        productId: item.productId,
        quantity: item.quantity,
        totalPrice: item.totalPrice,
      };
    });

    const newOrder = new Order({
      userId,
      items: orderItems,
      total: userCart.reduce((sum, item) => sum + item.totalPrice, 0),
    });

    await newOrder.save();
    await Cart.deleteMany({ userId });
    return NextResponse.json(
      { message: "Order placed successfully" },
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
