import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Order from "@/models/order";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page")) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;
    await connectToDatabase();
    const orders = await Order.find().skip(skip).limit(limit);
    const totalOrders = await Order.countDocuments();
    const hasMore = totalOrders > skip + orders.length;
    return NextResponse.json({ orders, hasMore }, { status: 200 });
  } catch (error) {
    console.error("Error fetching all orders", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
