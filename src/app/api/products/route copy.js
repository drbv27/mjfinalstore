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

/* export async function POST(request) {
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
} */

async function uploadToCloudinary(file) {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ resource_type: "auto" }, (error, result) => {
        if (error) {
          console.error("Cloudinary upload error:", error);
          return reject(new Error("Error al subir la imagen a Cloudinary."));
        }
        if (!result) {
          return reject(new Error("No se obtuvo resultado de Cloudinary."));
        }
        resolve(result.secure_url);
      })
      .end(buffer);
  });
}

export async function POST(request) {
  await dbConnect();

  try {
    const formData = await request.formData();
    const file = formData.get("image");
    if (!file) {
      return NextResponse.json(
        { success: false, error: "hace falta el archivo" },
        { status: 400 }
      );
    }

    const image = await uploadToCloudinary(file);
    return NextResponse.json({ success: true, image }, { status: 200 });
  } catch (error) {
    console.error("Error en la API de subida:", error);
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Error interno del servidor al procesar la subida.";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}
