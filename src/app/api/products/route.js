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

export async function POST(request) {
  await dbConnect();

  try {
    const body = await request.json(); //leemos el cuerpo de la peticion
    const product = await Product.create(body);
    return NextResponse.json({ success: true, data: product }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { succes: false, error: error.message },
      { status: 400 }
    );
  }
}
