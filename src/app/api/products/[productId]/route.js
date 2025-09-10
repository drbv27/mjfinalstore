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

//CRUD= Create - Read - Update - Delete (Crear-Leer-Actualizar-Borrar)
//Post - Get - Put - Delete

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

export async function PUT(request, { params }) {
  await dbConnect();

  try {
    //1.Obtener los datos del cuerpo de la peticion
    const body = await request.json();
    const { title, description, price, category } = body;

    //2.Usamos el metodo de mongoose findByIdAndUpdate
    //es la forma mas directa  de encontrar y actualizar en 1 solo paso el producto
    const updatedProduct = await Product.findByIdAndUpdate(
      params.productId,
      { title, description, price, category },
      //3. Esta opcion es  Vital sin ella  mongoose nos devuelve el documento
      //ANTES de la actualizacion con 'new:true' nos devolvera el documento ya Actualizado
      { new: true, runValidators: true }

      //como reto hacer una validacion 'if' que sino encuentra el producto
      //retorne una respuesta de NEXT
    );
    return NextResponse.json(
      { success: true, data: updatedProduct },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error al actualizar el producto", error);
    return NextResponse.json(
      { success: false, error: "Error interno del server" },
      { status: 500 }
    );
  }
}
