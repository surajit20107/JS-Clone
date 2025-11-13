import { NextResponse } from "next/server";
import redis from "@/lib/redis";

export async function POST(req: Request) {
  try {
    const { userId, productId } = await req.json();

    if (!userId || !productId) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const cartKey = `cart:${userId}`;
    // const currentQty = parseInt(await redis.hget(cartKey, productId)) || 0;
    const rawQty = await redis.hget(cartKey, productId);
    const currentQty = rawQty ? parseInt(rawQty) : 1;

    // Prevent decrement if quantity is already 1 or less
    if (currentQty == 1) {
      return NextResponse.json({ productId, quantity: currentQty });
    }

    const newQty = await redis.hincrby(cartKey, productId, -1);

    return NextResponse.json({ productId, quantity: newQty });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to decrement quantity" },
      { status: 500 },
    );
  }
}
