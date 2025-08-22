"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

const ProductsCard = ({ product }) => {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        {/* Usamos un div con aspect ratio para mantener el espacio de la imagen mientras carga */}
        <div className="relative w-full h-48">
          <Image
            src={product.image}
            alt={product.title}
            fill // 'fill' hace que la imagen llene el contenedor padre
            style={{ objectFit: "contain" }} // 'contain' asegura que toda la imagen sea visible
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <CardTitle className="truncate h-7 mt-4">{product.title}</CardTitle>
        <CardDescription>{product.category}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="font-bold text-lg">${product.price}</p>
      </CardContent>
      <CardFooter>
        {/* Enlace que nos llevará a la página de detalle */}
        <div className="flex flex-col">
          <Link href={`/products/${product.id}`} className="w-full">
            Ver Detalle
          </Link>
          <button className="p-2 border rounded-sm bg-teal-600 text-white font-bold">
            Añadir al carrito
          </button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductsCard;
