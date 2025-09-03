"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const CreateProductPage = () => {
  const [productData, setProductData] = useState({
    title: "",
    description: "",
    price: "",
    category: "electronics",
  });
  const [imageFile, setImageFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  /* const router = useRouter(); */

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile) {
      alert("por favor adjunta la imagen del producto");
      return;
    }
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("title", productData.title);
    formData.append("description", productData.description);
    formData.append("price", productData.price);
    formData.append("category", productData.category);
    formData.append("image", imageFile);

    console.log(formData);
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Crear un nuevo producto</h1>
      <form className="space-y-4 max-w-lg" onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Escribe el nombre del producto"
          value={productData.title}
          onChange={handleChange}
        />
        <Textarea
          placeholder="Escribe la descripcion del producto."
          rows={7}
          value={productData.description}
          onChange={handleChange}
        />
        <Input
          type="number"
          placeholder="Escribe el precio del producto"
          value={productData.price}
          onChange={handleChange}
        />
        <Input
          type="text"
          placeholder="Escribe la categoria del producto"
          value={productData.category}
          onChange={handleChange}
        />
        <Input
          type="file"
          placeholder="Elige la foto del producto"
          onChange={handleFileChange}
        />
        <Button>{isSubmitting ? "Guardando" : "Guardar Producto"}</Button>
      </form>
    </div>
  );
};

export default CreateProductPage;
