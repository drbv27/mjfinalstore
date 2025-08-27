import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Product from "@/models/Product";

export async function GET() {
  await dbConnect();

  try {
    const products = await Product.find({});
    return NextResponse.json({ succes: true, data: products });
  } catch (error) {
    return NextResponse.json(
      { succes: false, error: error.message },
      { status: 400 }
    );
  }
}
