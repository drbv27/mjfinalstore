import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Product from "@/models/Product";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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
    const formData = await request.formData();
    const file = formData.get("image");

    if (!file) {
      return NextResponse.json(
        { success: false, error: "la imagen es requerida." },
        { status: 400 }
      );
    }

    //1.Subir la imagen
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const cloudinaryUploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({}, (error, result) => {
          if (error) reject(error);
          resolve(result);
        })
        .end(buffer);
    });

    //2.Crear el producto en MongoDB con la url de la imagen
    const newProduct = await Product.create({
      title: formData.get("title"),
      description: formData.get("description"),
      price: formData.get("price"),
      category: formData.get("category"),
      rating: {
        rate: 0,
        count: 0,
      },
      image: cloudinaryUploadResult.secure_url,
      imagePublicId: cloudinaryUploadResult.public_id,
    });

    return NextResponse.json(
      { success: true, data: newProduct },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse(
      { status: false, error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
