//src/app/products/page.jsx
"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import ProductsCard from "@/components/products/ProductsCard";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get("/api/products");
      //console.log(response);
      setProducts(response.data.data);
    };
    fetchProducts();
  }, []);

  console.log(products);

  return (
    <div>
      <h2>Nuestros Productos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 p-8">
        {products.map((product) => (
          <ProductsCard product={product} key={product._id} />
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
