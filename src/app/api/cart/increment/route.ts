import { NextResponse } from "next/server";
import redis from "@/lib/redis";

export async function POST(req: Request) {
  try {
    const { userId, productId } = await req.json();

    if (!userId || !productId)
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });

    const cartKey = `cart:${userId}`;

    const newQty = await redis.HINCRBY(cartKey, productId, 1);

    return NextResponse.json({ productId, quantity: newQty });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to increment quantity" },
      { status: 500 },
    );
  }
}
