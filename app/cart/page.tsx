"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-context";
import { Trash2, ShoppingBag, ArrowRight, ArrowLeft } from "lucide-react";

export default function CartPage() {
  const { cart, removeFromCart, totalPrice, totalItems } = useCart();

  if (totalItems === 0) {
    return (
      <div className="bg-background min-h-screen pt-40 pb-20">
        <div className="container mx-auto px-6 md:px-12 text-center space-y-8">
          <div className="flex justify-center">
            <div className="w-24 h-24 rounded-full border border-white/5 flex items-center justify-center">
              <ShoppingBag className="w-10 h-10 text-white/20" />
            </div>
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-light text-white leading-tight">Your cart is <span className="italic font-serif">empty</span></h1>
            <p className="text-white/40 font-light text-lg max-w-md mx-auto">Looks like you haven't added any photography services yet.</p>
          </div>
          <Link href="/services">
            <Button size="lg" className="rounded-none bg-white text-black hover:bg-white/90 px-12 py-8 text-sm tracking-widest uppercase">
              Explore Services
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex items-center gap-4 mb-12">
          <Link href="/services" className="text-white/40 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-3xl md:text-5xl font-light text-white">Your Cart</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-8">
            {cart.map((item) => (
              <div key={item.id} className="flex flex-col md:flex-row gap-8 py-8 border-b border-white/5 group transition-all">
                <div className="relative w-full md:w-48 aspect-[4/3] overflow-hidden bg-zinc-900">
                  <Image 
                    src={item.image} 
                    alt={item.title} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                
                <div className="flex-grow flex flex-col justify-between py-2">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase tracking-widest text-white/30">{item.category}</span>
                      <h3 className="text-2xl font-light text-white tracking-wide">{item.title}</h3>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-white/20 hover:text-red-400 transition-colors p-2"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="flex justify-between items-end mt-8">
                    <div className="text-white/40 text-xs tracking-widest uppercase font-light">
                      Quantity: {item.quantity}
                    </div>
                    <div className="text-2xl font-light text-white tracking-tighter">
                      ${item.price * item.quantity}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="relative">
            <div className="p-10 border border-white/5 bg-zinc-950 space-y-10 sticky top-32">
              <h2 className="text-xl font-light tracking-widest uppercase border-b border-white/5 pb-6">Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between text-white/60 font-light">
                  <span>Subtotal</span>
                  <span>${totalPrice}</span>
                </div>
                <div className="flex justify-between text-white/60 font-light">
                  <span>Service Fee</span>
                  <span>$0</span>
                </div>
                <div className="pt-6 border-t border-white/5 flex justify-between items-center w-full text-2xl md:text-3xl font-light text-white">
                  <span className="tracking-widest uppercase text-xs text-white/40">Total</span>
                  <span className="tracking-tighter">${totalPrice}</span>
                </div>
              </div>

              <Link href="/checkout" className="block">
                <Button className="w-full rounded-none bg-white text-black hover:bg-white/90 py-10 text-sm tracking-[0.2em] uppercase transition-all flex items-center justify-center gap-3">
                  Checkout <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              
              <div className="flex items-center justify-center gap-3 opacity-50 hover:opacity-100 transition-opacity duration-500">
                <img 
                  src="/stripewhite.png" 
                  alt="Stripe" 
                  className="h-4 w-auto"
                />
                <span className="w-[1px] h-3 bg-white/10"></span>
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/40">
                  Secure Payment
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
