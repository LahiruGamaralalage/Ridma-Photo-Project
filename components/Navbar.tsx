"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Camera, Menu, X, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart-context";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Projects", href: "/projects" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled || isMobileMenuOpen ? "bg-black/90 backdrop-blur-md py-4 border-b border-white/10" : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-2xl tracking-tighter text-white z-50">
            <Camera className="w-8 h-8" />
            <span>RIDMA<span className="text-white/50">PHOTO</span></span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                href={link.href} 
                className="text-sm font-light tracking-widest uppercase hover:text-white/70 transition-colors text-white"
              >
                {link.name}
              </Link>
            ))}
          </div>
          
          <div className="flex items-center gap-4 md:gap-8">
            {/* Cart Icon */}
            <Link href="/cart" className="relative text-white hover:text-white/70 transition-colors">
              <ShoppingBag className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-white text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            <Link href="/contact" className="hidden sm:block">
              <Button variant="outline" className="rounded-none border-white/20 bg-transparent text-white hover:bg-white hover:text-black px-8">
                Book a Call
              </Button>
            </Link>

            {/* Hamburger Button */}
            <button 
              className="lg:hidden text-white z-50"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-black z-40 transition-transform duration-500 lg:hidden ${
          isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-12">
          {navLinks.map((link) => (
            <Link 
              key={link.name}
              href={link.href} 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-3xl font-light tracking-[0.3em] uppercase text-white hover:text-white/50 transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="pt-8">
            <Button variant="outline" className="rounded-none border-white/20 bg-transparent text-white hover:bg-white hover:text-black px-12 py-8 text-sm tracking-widest uppercase">
              Book a Call
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
