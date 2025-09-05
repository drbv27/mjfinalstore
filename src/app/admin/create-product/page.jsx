"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
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
  const router = useRouter();

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

    try {
      //await axios.post("1 ruta interna de mi back",2 aqui la informacion,3 aqui van los headers)
      await axios.post("/api/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Producto creado con exito");
      router.push("/products");
    } catch (error) {
      console.error("Error al crear el producto", error);
      alert("Hubo un problema al guardar el producto", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Crear un nuevo producto</h1>
      <form className="space-y-4 max-w-lg" onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Escribe el nombre del producto"
          name="title"
          value={productData.title}
          onChange={handleChange}
        />
        <Textarea
          placeholder="Escribe la descripcion del producto."
          rows={7}
          name="description"
          value={productData.description}
          onChange={handleChange}
        />
        <Input
          type="number"
          placeholder="Escribe el precio del producto"
          name="price"
          value={productData.price}
          onChange={handleChange}
        />
        <Input
          type="text"
          placeholder="Escribe la categoria del producto"
          name="category"
          value={productData.category}
          onChange={handleChange}
        />
        <Input
          type="file"
          placeholder="Elige la foto del producto"
          name="image"
          onChange={handleFileChange}
        />
        <Button>{isSubmitting ? "Guardando" : "Guardar Producto"}</Button>
      </form>
    </div>
  );
};

export default CreateProductPage;
