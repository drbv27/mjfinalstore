//src/app/api/products/[productId]/route.js
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Product from "@/models/Product";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//Traer un solo producto
export async function GET(request, { params }) {
  await dbConnect();

  try {
    const product = await Product.findById(params.productId);
    if (!product) {
      return NextResponse.json(
        { success: false, error: "Producto no encontrado" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: product }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "ID del producto invalido" },
      { status: 400 }
    );
  }
}

//Borrar 1 producto
export async function DELETE(request, { params }) {
  await dbConnect();

  try {
    //1. Buscar el producto antes de borrarlo
    //para obtener la url de la imagen
    const productToDelete = await Product.findById(params.productId);

    if (!productToDelete) {
      return NextResponse.json(
        { success: false, error: "Producto no encontrado" },
        { status: 404 }
      );
    }
    //2.Si el producto tiene imagen, la borramos de Cloudinary
    //Tip: coloquemos una validacion si un producto no tiene imagen
    if (productToDelete.imagePublicId) {
      await cloudinary.uploader.destroy(productToDelete.imagePublicId);
    }

    //3.ahora si podemos borrar el producto de Mongo DB
    //const deleteProduct = await Product.findByIdAndDelete(params.productId);
    await Product.findByIdAndDelete(params.productId);

    return NextResponse.json(
      { success: true, message: "Producto eliminado con exito" },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error al eliminar el producto", error);
    return NextResponse.json(
      { success: false, error: "Error interno del server" },
      { status: 500 }
    );
  }
}
