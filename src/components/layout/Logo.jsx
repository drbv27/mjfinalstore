import React from "react";
import { ShoppingBag } from "lucide-react";

const Logo = () => {
  return (
    <div className="text-lg font-bold text-teal-900 flex gap-1">
      <ShoppingBag /> <span>Diego's Store</span>
    </div>
  );
};

export default Logo;
