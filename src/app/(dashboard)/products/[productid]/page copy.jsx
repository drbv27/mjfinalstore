"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const ProductDetailPage = ({ params }) => {
  const { productid } = params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await axios.get(
        `https://fakestoreapi.com/products/${productid}`
      );
      //console.log(response);
      setProduct(response.data);
      setError(null);
      setLoading(false);
    };
    fetchProduct();
  }, [productid]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error</p>;
  if (!product) return <p>No se encontro el producto...</p>;

  return (
    <div className="container mx-auto p-4 md:p-32">
      <div className="grid md:grid-cols-2 gap-8 items-start border border-gray-50 shadow-lg rounded-xl p-8">
        <div className="relative w-full h-96 bg-white rounded-lg p-4">
          <Image
            src={product.image}
            alt={product.title}
            fill
            style={{ objectFit: "contain" }}
            priority
          />
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="text-center font-bold text-3xl text-teal-900">
            {product.title}
          </h2>
          <p className="text-xs text-teal-500 bg-teal-100 uppercase px-2 py-1 rounded-md w-fit">
            {product.category}
          </p>
          <p className="text-2xl text-right font-semibold text-teal-800">
            ${product.price}
          </p>
          <p className="text-xs text-gray-600 leading-relaxed">
            {product.description}
          </p>
          <div className="flex items-center justify-center gap-2 text-gray-600">
            <span>
              ⭐ {product.rating.rate} ({product.rating.count} opiniones)
            </span>
          </div>
          <Button>Añadir al carrito</Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
