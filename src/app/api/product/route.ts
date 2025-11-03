import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import Product from "@/models/product";
import { connectToDatabase } from "@/lib/mongodb";
import { productSchema } from "@/lib/schema";

export async function POST(req: NextRequest) {
  try {
    const { name, price, description, image, category, stock, rating } =
      await req.json();

    // validate request body
    const result = productSchema.safeParse({
      name,
      price,
      description,
      image,
      category,
      stock,
      rating,
    });

    if (!result.success) {
      return NextResponse.json(
        { message: result.error.issues[0].message || "Invalid input data" },
        { status: 400 },
      );
    }

    // connect to database
    await connectToDatabase();

    const product = new Product({
      name,
      price,
      description,
      image,
      category,
      stock,
      rating,
    });

    await product.save();

    return NextResponse.json(
      { message: "Product created successfully" },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { message: "Error creating product" },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    connectToDatabase();
    const products = await Product.find();
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { message: "Error fetching products" },
      { status: 500 },
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    
    const id = searchParams.get("id");
    
    if (!id) {
      return NextResponse.json(
        { message: "Product id is required" },
        { status: 400 },
      );
    }

    await connectToDatabase();

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ message: "Product deleted" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { message: "Error deleting product" },
      { status: 500 },
    );
  }
}
