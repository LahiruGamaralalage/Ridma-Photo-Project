"use client";

import { AlertCircle, ArrowLeft, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function CancelPage() {
  return (
    <div className="bg-background min-h-screen flex items-center justify-center p-6">
      <div className="max-w-2xl w-full text-center space-y-10 animate-in fade-in zoom-in-95 duration-1000">
        <div className="flex justify-center">
          <div className="w-24 h-24 border border-red-900/20 rounded-full flex items-center justify-center">
            <AlertCircle className="w-12 h-12 text-red-500/50" />
          </div>
        </div>
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-light text-white leading-tight">
            Payment <span className="italic font-serif">Cancelled</span>
          </h1>
          <p className="text-lg md:text-xl text-white/50 font-light leading-relaxed max-w-lg mx-auto">
            Your booking has not been confirmed. No charges were made. You can review your cart or try again when you're ready.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            href="/cart"
            className={buttonVariants({ 
              variant: "outline",
              size: "lg", 
              className: "rounded-none border-white/10 text-white hover:bg-white hover:text-black px-12 py-8 text-sm tracking-widest uppercase w-full sm:w-auto" 
            })}
          >
            <ArrowLeft className="mr-2 w-4 h-4" /> Back to Cart
          </Link>
          <Link 
            href="/services"
            className={buttonVariants({ 
              size: "lg", 
              className: "rounded-none bg-white text-black hover:bg-white/90 px-12 py-8 text-sm tracking-widest uppercase w-full sm:w-auto" 
            })}
          >
            <ShoppingBag className="mr-2 w-4 h-4" /> Explore Services
          </Link>
        </div>
      </div>
    </div>
  );
}
