"use client";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingBasket } from "lucide-react";

const ShoppingCart = () => {
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
          <SheetTitle>Are you absolutely sure?</SheetTitle>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default ShoppingCart;
