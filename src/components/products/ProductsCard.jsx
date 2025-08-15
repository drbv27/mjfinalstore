"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

const ProductsCard = ({ product }) => {
  return (
    <Card>
      <CardHeader>
        <div className="w-[10vw]">
          <img src={product.image} alt={product.title} className="w-full" />
        </div>
        {/*         <Image
          src={product.image}
          alt={product.title}
          width={500}
          height={500}
        /> */}
        <CardTitle>{product.title}</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  );
};

export default ProductsCard;
