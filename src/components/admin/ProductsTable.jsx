//src/components/admin/ProductsTable.jsx
"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import { PencilLine, Trash2 } from "lucide-react";
import { toast } from "sonner";

const ProductsTable = ({ products, onDeleteProduct }) => {
  const handleDelete = async (productId) => {
    if (!confirm("Estas seguro que deseas eliminar el producto")) return;

    try {
      await axios.delete(`/api/products/${productId}`);
      toast.success("Producto eliminado satisfactoriamente");
      onDeleteProduct(productId); //notificamos al padre
    } catch (error) {
      toast.error("No se pudo eliminar el producto");
      //console.log("error",error)
    }
  };

  return (
    <Table>
      {/* opcional */}
      {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Id</TableHead>
          <TableHead>Nombre</TableHead>
          <TableHead>Descripcion</TableHead>
          <TableHead>Precio</TableHead>
          <TableHead className="text-right">Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow product={product} key={product._id}>
            <TableCell className="font-sm font-slate-300">
              {product._id}
            </TableCell>
            <TableCell>{product.title}</TableCell>
            <TableCell>{product.description}</TableCell>
            <TableCell>{product.price}</TableCell>
            <TableCell className="text-right">
              <Button variant="outline">
                <PencilLine />
              </Button>
              <Button
                variant="destructive"
                className="ml-1"
                onClick={() => handleDelete(product._id)}
              >
                <Trash2 />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ProductsTable;
