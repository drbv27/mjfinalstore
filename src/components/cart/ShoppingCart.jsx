//src/components/cart/ShoppingCart.jsx
"use client";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingBasket } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { Separator } from "../ui/separator";

const ShoppingCart = () => {
  const {
    items,
    removeProduct,
    incrementQuantity,
    getTotalItems,
    getTotalPrice,
  } = useCartStore();

  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="flex items-center gap-2 p-2 rounded-md hover:bg-teal-100 trasitions-colors">
          <ShoppingBasket />
          <span>Mi Carrito</span>
        </button>
      </SheetTrigger>

      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Mi Carrito de compras</SheetTitle>
        </SheetHeader>
        {/* ustedes deben organizar el carrito */}
        <div>
          {items.map((item) => (
            <p key={item._id}>
              {item.title}
              <button className="bg-slate-400 p-1">-</button>
              <span className="bg-teal-700 text-white">{item.quantity}</span>
              <button
                onClick={() => incrementQuantity(item.id)}
                className="bg-slate-400 p-1"
              >
                +
              </button>
              <button
                onClick={() => removeProduct(item.id)}
                className="bg-red-700 text-white font-bold"
              >
                x
              </button>
            </p>
          ))}
        </div>
        <Separator />
        <div>Total productos:{totalItems}</div>
        <div>Total a pagar:{totalPrice}</div>
      </SheetContent>
    </Sheet>
  );
};

export default ShoppingCart;
