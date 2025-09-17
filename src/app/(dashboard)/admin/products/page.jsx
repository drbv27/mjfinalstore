//src/app/admin/products/page.jsx
"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import CreateProductDialog from "@/components/admin/CreateProductDialog";
import EditProductDialog from "@/components/admin/EditProductDialog";
import ProductsTable from "@/components/admin/ProductsTable";
import { SignOutButton, useAuth } from "@clerk/nextjs";

const AdminProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [isEditingDialogOpen, setIsEditingDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const { isSignedIn, sessionClaims } = useAuth();

  const isAdmin = sessionClaims?.metadata?.role === "admin";

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setIsEditingDialogOpen(true);
  };

  const fetchProducts = async () => {
    const response = await axios.get("/api/products");
    //console.log(response);
    setProducts(response.data.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = (deletedProductId) => {
    setProducts(products.filter((p) => p._id !== deletedProductId));
  };

  return (
    <div className="container mx-auto p-8">
      {isAdmin ? (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-teal-900">
              Administracion de productos
            </h1>
            <CreateProductDialog onProductCreated={fetchProducts} />
          </div>
          <ProductsTable
            products={products}
            onDeleteProduct={handleDelete}
            onEditProduct={handleEditClick}
          />
          <EditProductDialog
            product={selectedProduct}
            onProductSaved={fetchProducts}
            open={isEditingDialogOpen}
            setOpen={setIsEditingDialogOpen}
          />
        </div>
      ) : (
        <div>
          <h2 className="text-red-500 font-bold text-4xl text-center mt-12">
            No estas autorizado para visitar esta pagina
          </h2>
        </div>
      )}
    </div>
  );
};

export default AdminProductsPage;
