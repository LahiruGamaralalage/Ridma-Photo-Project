"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShoppingCart, CheckCircle2, AlertCircle, Loader2, ArrowLeft, Calendar, User, Mail, Phone, MessageSquare } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

import { Suspense } from "react";

import { buttonVariants } from "@/components/ui/button";

function CheckoutContent() {
  const { cart, totalPrice, clearCart } = useCart();
  const searchParams = useSearchParams();
  const success = searchParams.get("success");
  const canceled = searchParams.get("canceled");
  const customerName = searchParams.get("customer_name");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventDate: "",
    requirements: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (success === "true") {
      setIsSuccess(true);
      clearCart();
    }
    if (canceled === "true") {
      setError("Payment was cancelled. You can try again when you're ready.");
    }
  }, [success, canceled, clearCart]);

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    // Phone validation (simple international format)
    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    if (!phoneRegex.test(formData.phone)) {
      errors.phone = "Please enter a valid phone number (min 10 digits)";
    }

    // Date validation (no past or today dates)
    const selectedDate = new Date(formData.eventDate);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    
    if (selectedDate < tomorrow) {
      errors.eventDate = "Please select a date from tomorrow onwards";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    // Clear field error when user starts typing
    if (fieldErrors[id]) {
      setFieldErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[id];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;
    
    if (!validateForm()) {
      setError("Please fix the errors in the form before proceeding.");
      return;
    }
    
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerName: formData.name,
          email: formData.email,
          phone: formData.phone,
          eventDate: formData.eventDate,
          requirements: formData.requirements,
          items: cart.map(item => ({
            productId: item.id,
            name: item.title,
            price: item.price,
            quantity: item.quantity
          })),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("Failed to create checkout session");
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Something went wrong";
      setError(errorMessage);
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-background min-h-screen flex items-center justify-center p-6">
        <div className="max-w-2xl w-full text-center space-y-10 animate-in fade-in zoom-in-95 duration-1000">
          <div className="flex justify-center">
            <div className="w-24 h-24 border border-white/10 rounded-full flex items-center justify-center animate-bounce">
              <CheckCircle2 className="w-12 h-12 text-white" />
            </div>
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-light text-white leading-tight">Order <span className="italic font-serif">Confirmed</span></h1>
            <p className="text-lg md:text-xl text-white/50 font-light leading-relaxed max-w-lg mx-auto">
              Thank you, <span className="text-white">{customerName || formData.name}</span>. Your vision is now our mission. We&apos;ll contact you shortly to finalize the details.
            </p>
          </div>
          <button 
            onClick={() => window.location.href = "/"}
            className={buttonVariants({ 
              size: "lg", 
              className: "rounded-none bg-white text-black hover:bg-white/90 px-12 py-8 text-sm tracking-widest uppercase cursor-pointer relative z-50" 
            })}
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="bg-background min-h-screen flex items-center justify-center p-6">
        <div className="text-center space-y-8">
          <h1 className="text-3xl font-light text-white">Your checkout is empty</h1>
          <Link 
            href="/services" 
            className={buttonVariants({ 
              className: "rounded-none bg-white text-black px-10 py-6 uppercase text-xs tracking-widest" 
            })}
          >
            Browse Services
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex items-center gap-4 mb-12">
          <Link href="/cart" className="text-white/40 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-3xl md:text-5xl font-light text-white">Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Checkout Form */}
          <section className="space-y-12">
            <div className="space-y-12">
              <div className="space-y-2">
                <span className="text-white/40 tracking-[0.4em] uppercase text-[10px]">Booking Details</span>
                <div className="w-10 h-[1px] bg-white/20"></div>
              </div>
              
              <form id="checkout-form" onSubmit={handleSubmit} className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Name */}
                  <div className="space-y-3">
                    <label htmlFor="name" className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-light flex items-center gap-2">
                      <User className="w-3 h-3" /> Full Name
                    </label>
                    <Input 
                      id="name" 
                      placeholder="John Doe" 
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="rounded-none border-white/10 bg-zinc-950 text-white h-14 focus-visible:ring-white/20"
                    />
                  </div>
                  {/* Email */}
                  <div className="space-y-3">
                    <label htmlFor="email" className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-light flex items-center gap-2">
                      <Mail className="w-3 h-3" /> Email Address
                    </label>
                    <Input 
                      id="email" 
                      type="email"
                      placeholder="john@example.com" 
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className={`rounded-none border-white/10 bg-zinc-950 text-white h-14 focus-visible:ring-white/20 ${fieldErrors.email ? 'border-red-500/50 focus-visible:ring-red-500/20' : ''}`}
                    />
                    {fieldErrors.email && <p className="text-[10px] text-red-500/80 tracking-wide uppercase font-light">{fieldErrors.email}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Phone */}
                  <div className="space-y-3">
                    <label htmlFor="phone" className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-light flex items-center gap-2">
                      <Phone className="w-3 h-3" /> Phone Number
                    </label>
                    <Input 
                      id="phone" 
                      type="tel"
                      placeholder="+94 777 000 000" 
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className={`rounded-none border-white/10 bg-zinc-950 text-white h-14 focus-visible:ring-white/20 ${fieldErrors.phone ? 'border-red-500/50 focus-visible:ring-red-500/20' : ''}`}
                    />
                    {fieldErrors.phone && <p className="text-[10px] text-red-500/80 tracking-wide uppercase font-light">{fieldErrors.phone}</p>}
                  </div>
                  {/* Date */}
                  <div className="space-y-3">
                    <label htmlFor="eventDate" className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-light flex items-center gap-2">
                      <Calendar className="w-3 h-3" /> Preferred Date
                    </label>
                    <Input 
                      id="eventDate" 
                      type="date"
                      value={formData.eventDate}
                      onChange={handleChange}
                      required
                      min={new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0]}
                      className={`rounded-none border-white/10 bg-zinc-950 text-white h-14 focus-visible:ring-white/20 [color-scheme:dark] ${fieldErrors.eventDate ? 'border-red-500/50 focus-visible:ring-red-500/20' : ''}`}
                    />
                    {fieldErrors.eventDate && <p className="text-[10px] text-red-500/80 tracking-wide uppercase font-light">{fieldErrors.eventDate}</p>}
                  </div>
                </div>

                {/* Requirements */}
                <div className="space-y-3">
                  <label htmlFor="requirements" className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-light flex items-center gap-2">
                    <MessageSquare className="w-3 h-3" /> Specific Requirements
                  </label>
                  <textarea 
                    id="requirements" 
                    rows={4}
                    placeholder="Tell us more about your event or vision..." 
                    value={formData.requirements}
                    onChange={handleChange}
                    className="w-full rounded-none border border-white/10 bg-zinc-950 text-white p-4 focus:ring-1 focus:ring-white/20 focus:border-white/20 outline-none transition-all placeholder:text-white/10 font-light text-sm"
                  ></textarea>
                </div>
                
                <div className="pt-6">
                  <Button 
                    type="submit" 
                    form="checkout-form" 
                    className="w-full rounded-none bg-white text-black hover:bg-white/90 py-10 text-sm tracking-[0.2em] uppercase transition-all" 
                    disabled={isSubmitting || !formData.name || !formData.email || !formData.phone || !formData.eventDate}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing Order...
                      </>
                    ) : (
                      "Place Order"
                    )}
                  </Button>
                </div>
              </form>
            </div>

            {error && (
              <div className="border border-red-900/50 bg-red-900/10 p-6 flex items-center gap-4 text-red-400">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <p className="text-sm font-light tracking-wide">{error}</p>
              </div>
            )}
          </section>

          {/* Order Summary */}
          <section className="space-y-8">
            <div className="p-10 border border-white/5 bg-zinc-950 space-y-10 sticky top-32">
              <div className="flex items-center gap-3 border-b border-white/5 pb-6">
                <ShoppingCart className="w-5 h-5 text-white/40" />
                <h2 className="text-xl font-light tracking-widest uppercase">Summary</h2>
              </div>
              
              <div className="space-y-6 max-h-[30vh] overflow-y-auto pr-4 custom-scrollbar">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-start">
                    <div className="space-y-1">
                      <p className="text-lg font-light text-white tracking-wide">{item.title}</p>
                      <p className="text-[10px] text-white/30 uppercase tracking-[0.2em]">{item.category}</p>
                    </div>
                    <p className="text-lg font-light">${item.price}</p>
                  </div>
                ))}
              </div>
              
              <div className="pt-10 border-t border-white/10 flex justify-between items-center w-full text-2xl md:text-3xl font-light">
                <span className="tracking-widest uppercase text-xs text-white/40">Total Investment</span>
                <span className="tracking-tighter text-white">${totalPrice}</span>
              </div>

              <div className="bg-white/5 p-6 space-y-4">
                <p className="text-[10px] uppercase tracking-widest text-white/40 leading-relaxed">
                  Next steps: After placing your order, our team will review the details and contact you within 24 hours to confirm the schedule and location.
                </p>
                <div className="pt-4 border-t border-white/5 flex items-center gap-3 opacity-30 hover:opacity-100 transition-opacity duration-500">
                  <img 
                    src="/stripewhite.png" 
                    alt="Stripe" 
                    className="h-3.5 w-auto"
                  />
                  <span className="w-[1px] h-3 bg-white/10"></span>
                  <p className="text-[9px] uppercase tracking-[0.2em] text-white/40">
                    Secure Payment
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="bg-background min-h-screen flex items-center justify-center p-6">
        <Loader2 className="w-8 h-8 text-white/20 animate-spin" />
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
}
