"use client";

import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { toast } from "sonner";

export default function AddToCartButton({ service }: { service: any }) {
  const { addToCart } = useCart();

  const handleAdd = () => {
    addToCart({
      id: service._id.toString(),
      title: service.title,
      price: service.price,
      image: service.image,
      category: service.category
    });
    toast.success("Added to cart");
  };

  return (
    <Button 
      onClick={handleAdd}
      className="w-full rounded-none bg-white text-black hover:bg-white/90 py-8 text-sm tracking-[0.2em] uppercase transition-all flex gap-3 font-light"
    >
      <ShoppingCart className="w-4 h-4" />
      Add to Cart
    </Button>
  );
}
