"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useCart } from "@/lib/cart-context";
import { CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

function SuccessContent() {
  const { clearCart } = useCart();
  const searchParams = useSearchParams();
  const customerName = searchParams.get("customer_name");

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="bg-background min-h-screen flex items-center justify-center p-6">
      <div className="max-w-2xl w-full text-center space-y-10 animate-in fade-in zoom-in-95 duration-1000">
        <div className="flex justify-center">
          <div className="w-24 h-24 border border-white/10 rounded-full flex items-center justify-center animate-bounce">
            <CheckCircle2 className="w-12 h-12 text-white" />
          </div>
        </div>
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-light text-white leading-tight">
            Order <span className="italic font-serif">Confirmed</span>
          </h1>
          <p className="text-lg md:text-xl text-white/50 font-light leading-relaxed max-w-lg mx-auto">
            Thank you, <span className="text-white">{customerName || "valued client"}</span>. Your vision is now our mission. 
            We've sent a confirmation email to you, and we&apos;ll contact you shortly to finalize the details.
          </p>
        </div>
        <Link 
          href="/"
          className={buttonVariants({ 
            size: "lg", 
            className: "rounded-none bg-white text-black hover:bg-white/90 px-12 py-8 text-sm tracking-widest uppercase" 
          })}
        >
          Return Home <ArrowRight className="ml-2 w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="bg-background min-h-screen flex items-center justify-center">
        <div className="text-white/20 animate-pulse uppercase tracking-[0.4em] text-[10px]">Verifying Transaction...</div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
