import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import redis from "@/lib/redis";
import Cart from "@/models/cart";
import Product from "@/models/product";

// add product to user cart
export async function POST(req: Request) {
  try {
    const { userId, productId } = await req.json();

    if (!userId || !productId) {
      return NextResponse.json(
        { message: "Missing user Id or product id" },
        { status: 400 },
      );
    }

    await connectToDatabase();

    const product = await Product.findById(productId);

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 },
      );
    }

    const existingCart = await Cart.findOne({
      userId,
      productId,
    });

    if (existingCart) {
      existingCart.quantity += 1;
      existingCart.totalPrice += product.price;
      await existingCart.save();
    } else {
      await Cart.create({
        userId,
        productId,
        quantity: 1,
        totalPrice: Number(product.price),
      });
    }

    // add to redis
    await redis.HSET(`cart:${userId}`, productId, 1);

    return NextResponse.json(
      { message: "Product added to cart successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error adding product to cart", error },
      { status: 500 },
    );
  }
}

// get user cart items
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { message: "Please login to access your cart" },
        { status: 401 },
      );
    }

    await connectToDatabase();

    const dbCart = await Cart.find({ userId }).populate("productId");
    const redisCart = (await redis.HGETALL(`cart:${userId}`)) as Record<string, string>
console.log(redisCart)
    // 🔁 Sync Redis if empty
    if (Object.keys(redisCart).length === 0) {
      for (const item of dbCart) {
        await redis.HSET(
          `cart:${userId}`,
          item.productId._id.toString(),
          item.quantity,
        );
      }
    }

    // 🧠 Merge Redis quantity with DB cart
    const userCart = dbCart.map((item) => {
      const redisQty = redisCart[item?.productId._id];
      // const quantity = redisQty ? parseInt(redisQty) : item.quantity;
      const quantity = redisQty ? redisQty : item.quantity;

      return {
        _id: item._id,
        userId: item.userId,
        productId: item.productId,
        quantity,
        totalPrice: item.productId.price * quantity,
      };
    });

    return NextResponse.json({ userCart }, { status: 200 });
  } catch (error) {
    console.error("Cart fetch error:", error);
    return NextResponse.json(
      { message: "Error fetching cart items" },
      { status: 500 },
    );
  }
}

// delete cart item
export async function DELETE(req: Request) {
  try {
    const { userId, productId } = await req.json();

    if (!userId || !productId) {
      return NextResponse.json(
        { message: "Missing user Id or product id" },
        { status: 400 },
      );
    }

    await connectToDatabase();

    const deletedCartItem = await Cart.findOneAndDelete({
      userId,
      productId,
    });

    if (!deletedCartItem) {
      return NextResponse.json(
        { message: "Cart item not found" },
        { status: 404 },
      );
    }

    // delete from redis
    await redis.HDEL(`cart:${userId}`, productId);

    return NextResponse.json(
      { message: "Cart item deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error deleting cart item:", error);
    return NextResponse.json(
      { message: "Error deleting cart item" },
      { status: 500 },
    );
  }
}
