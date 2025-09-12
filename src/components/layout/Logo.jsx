//src/components/layout/Logo.jsx
import React from "react";
import { ShoppingBag } from "lucide-react";

const Logo = () => {
  return (
    <div className="text-lg font-bold text-teal-900 flex gap-1">
      <ShoppingBag /> <span>Diegos Store</span>
    </div>
  );
};

export default Logo;
