//src/app/admin/products/page.jsx
"use client";
/* import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Input } from "@/components/ui/input"; */
import CreateProductDialog from "@/components/admin/CreateProductDialog";
import ProductsTable from "@/components/admin/ProductsTable";

const AdminProductsPage = () => {
  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-teal-900">
          Administracion de productos
        </h1>
        <CreateProductDialog />
      </div>
      <ProductsTable />
    </div>
  );
};

export default AdminProductsPage;
