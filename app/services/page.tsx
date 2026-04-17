"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Camera, Image as ImageIcon, Video, Star, ShoppingCart, Loader2 } from "lucide-react";
import { useCart } from "@/lib/cart-context";

const getIcon = (category: string) => {
  switch (category) {
    case "Photography": return Camera;
    case "Events": return Video;
    case "Commercial": return ImageIcon;
    default: return Star;
  }
};

export default function ServicesPage() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch("/api/services")
      .then(res => res.json())
      .then(data => {
        setServices(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="bg-background min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-white/20 animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6 md:px-12">
        <div className="space-y-6 mb-20">
          <span className="text-white/40 tracking-[0.4em] uppercase text-xs md:text-sm">
            Our Services
          </span>
          <h1 className="text-4xl md:text-6xl font-light text-white leading-tight text-glow">
            Professional <span className="italic font-serif">Photography</span> Solutions
          </h1>
          <p className="max-w-2xl text-white/50 font-light text-lg">
            Choose from our specialized photography packages tailored to capture your 
            vision with precision and artistry.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {services.map((service) => {
            const Icon = getIcon(service.category);
            return (
              <div key={service._id} className="group relative flex flex-col border border-white/5 bg-zinc-950 transition-all duration-700 overflow-hidden">
                {/* Image Header */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image 
                    src={service.image} 
                    alt={service.title} 
                    fill 
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-50 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent"></div>
                </div>

                {/* Sophisticated Gradient Hover Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

                <div className="p-8 flex-grow flex flex-col justify-between relative z-10">
                  <div className="space-y-6">
                    <div className="flex justify-between items-start">
                      <div className="w-10 h-10 border border-white/10 group-hover:border-white/40 flex items-center justify-center transition-colors">
                        <Icon className="w-5 h-5 text-white/60 group-hover:text-white" />
                      </div>
                      <span className="text-[10px] uppercase tracking-widest text-white/30 group-hover:text-white/60 transition-colors">{service.category}</span>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-2xl font-light tracking-wide text-white group-hover:text-glow transition-all">{service.title}</h3>
                      <p className="text-white/50 font-light text-sm leading-relaxed group-hover:text-white/80 transition-colors">{service.description}</p>
                    </div>
                  </div>
                  
                  <div className="mt-12 pt-8 border-t border-white/5 group-hover:border-white/10 flex items-center justify-between transition-colors">
                    <span className="text-2xl font-light tracking-tighter text-white">${service.price}</span>
                    <div className="flex gap-4">
                      <Link href={`/services/${service._id}`}>
                        <Button variant="link" className="text-white/40 group-hover:text-white p-0 h-auto text-[10px] uppercase tracking-widest transition-colors">
                          Details
                        </Button>
                      </Link>
                      <Button 
                        onClick={() => addToCart({
                          id: service._id,
                          title: service.title,
                          price: service.price,
                          image: service.image,
                          category: service.category
                        })}
                        className="rounded-none bg-white/5 hover:bg-white text-white hover:text-black border border-white/10 hover:border-white px-6 py-4 h-auto text-[10px] uppercase tracking-widest transition-all duration-500 gap-2"
                      >
                        <ShoppingCart className="w-3 h-3" />
                        Add
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
