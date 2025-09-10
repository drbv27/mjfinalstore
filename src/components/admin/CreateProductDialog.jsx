//src/components/admin/CreateProductDialog.jsx
"use client";
import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const initialState = {
  title: "",
  description: "",
  price: "",
  category: "",
};

const CreateProductDialog = ({ onProductCreated }) => {
  const [productData, setProductData] = useState(initialState);
  const [imageFile, setImageFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [open, setOpen] = useState(false);

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
      toast.success("Producto creado con exito");
      setProductData(initialState); //borrarme el formulario
      setImageFile(null); //quite la imagen del buffer
      setOpen(false);

      //aqui esta la magia llamamos a la funcion que le pasamos desde el padre "products"
      if (onProductCreated) {
        onProductCreated();
      }
    } catch (error) {
      //console.error("Error al crear el producto", error);
      toast.error("Hubo un problema al crear el producto");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Crear Producto</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crear un nuevo producto</DialogTitle>
          <DialogDescription>
            Complete todos los detalles del formulario
          </DialogDescription>
        </DialogHeader>
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
          <Button className="w-full" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Guardando" : "Guardar Producto"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProductDialog;
