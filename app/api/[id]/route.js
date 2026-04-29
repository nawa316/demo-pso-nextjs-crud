import connectMongoDB from "@/app/libs/mongoDB";
import Products from "@/app/models/products";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const { id } = params;
    await connectMongoDB();
    const product = await Products.findOne({ _id: id });
    return NextResponse.json({ product }, { status: 200 });
  } catch (error) {
    console.error("GET /api/[id] error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request, { params }) {
  try {
    const { id } = params;
    const { title, description, price } = await request.json();
    await connectMongoDB();
    await Products.findByIdAndUpdate(id, { title, description, price });
    return NextResponse.json({ message: "Product updated successfully" }, { status: 200 });
  } catch (error) {
    console.error("POST /api/[id] error:", error);
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    console.log("DELETE", id);
    await connectMongoDB();
    await Products.findByIdAndDelete(id);
    return NextResponse.json({ message: "Product deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("DELETE /api/[id] error:", error);
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}
