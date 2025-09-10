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

const initialState = {
  title: "",
  description: "",
  price: "",
  category: "electronics",
};

const CreateProductDialog = ({ onProductCreated }) => {
  const [productData, setProductData] = useState(initialState);
  const [imageFile, setImageFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e) => {
    console.log("enviando");
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  return (
    <Dialog>
      <DialogTrigger>
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
          {/* <Button>{isSubmitting ? "Guardando" : "Guardar Producto"}</Button> */}
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProductDialog;
