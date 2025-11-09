import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
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
        { message: "Product nkt found" },
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
        // quantity: 1,
        totalPrice: Number(product.price),
      });
    }

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
        {
          message: "Please login to access your cart",
        },
        { status: 401 },
      );
    }

    await connectToDatabase();

    const userCart = await Cart.find({ userId }).populate("productId");
    return NextResponse.json({ userCart }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Error fetching cart items",
      },
      { status: 500 },
    );
  }
}
