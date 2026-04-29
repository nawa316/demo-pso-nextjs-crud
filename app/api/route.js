import connectMongoDB from "@/app/libs/mongoDB";
import Products from "@/app/models/products";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectMongoDB();
    const products = await Products.find();
    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    console.error("GET /api error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { title, description, price } = await request.json();
    await connectMongoDB();
    await Products.create({ title, description, price });
    return NextResponse.json({ message: "Product created successfully" }, { status: 200 });
  } catch (error) {
    console.error("POST /api error:", error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}
