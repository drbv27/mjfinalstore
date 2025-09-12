"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

/**
 * Componente Dialog para editar un producto existente.
 * @param {object} product - El objeto del producto a editar.
 * @param {function} onProductSaved - Callback que se ejecuta cuando el producto se guarda exitosamente para refrescar la lista.
 * @param {boolean} open - Estado booleano para controlar si el dialog está abierto.
 * @param {function} setOpen - Función para cambiar el estado `open`.
 */

const EditProductDialog = ({ product, onProductSaved, open, setOpen }) => {
  // Estado para manejar los datos del formulario
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
  });

  // Estado para controlar el estado de envío del formulario
  const [isSubmitting, setIsSubmitting] = useState(false);

  // useEffect se ejecuta cuando la prop 'product' cambia.
  // Es perfecto para llenar el formulario cuando el dialog se abre con un producto seleccionado.
  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title || "",
        description: product.description || "",
        price: product.price || "",
        category: product.category || "",
      });
    }
  }, [product]);

  // Manejador para actualizar el estado del formulario cuando el usuario escribe
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Manejador para enviar el formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Usamos el método PUT y el ID del producto para actualizar
      await axios.put(`/api/products/${product._id}`, formData);
      toast.success("Producto actualizado exitosamente.");

      setOpen(false); // Cierra el dialog
      onProductSaved(); // Llama al callback para refrescar la tabla en la página principal
    } catch (error) {
      toast.error("Hubo un error al actualizar el producto.");
      console.error("Error de actualización:", error);
    } finally {
      setIsSubmitting(false); // Rehabilita el botón de guardar
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Producto</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Nombre
            </Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Descripción
            </Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">
              Precio
            </Label>
            <Input
              id="price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">
              Categoría
            </Label>
            <Input
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Guardando..." : "Guardar Cambios"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProductDialog;
