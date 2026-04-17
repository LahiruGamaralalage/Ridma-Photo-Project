import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";
import dbConnect from "@/lib/db";
import Service from "@/models/Service";
import AddToCartButton from "./AddToCartButton";

export default async function ServiceDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  await dbConnect();
  const service = await Service.findById(id);

  if (!service) {
    notFound();
  }

  return (
    <div className="bg-background min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex items-center gap-4 mb-12">
          <Link href="/services" className="text-white/40 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <span className="text-white/40 tracking-[0.4em] uppercase text-[10px] font-light">{service.category}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
          <div className="lg:col-span-2 space-y-12">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-7xl font-light text-white leading-tight tracking-tight">
                {service.title}
              </h1>
              <p className="text-xl md:text-2xl text-white/50 font-light leading-relaxed max-w-2xl">
                {service.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-white/5">
              <div className="space-y-6">
                <h3 className="text-[10px] uppercase tracking-[0.4em] text-white/30 font-light">Service Includes</h3>
                <ul className="space-y-6">
                  {[
                    "Professional high-resolution editing",
                    "Digital delivery via private gallery",
                    "Commercial usage rights included",
                    "Dedicated support throughout the process"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-4 group">
                      <div className="mt-1 w-5 h-5 border border-white/10 rounded-full flex items-center justify-center group-hover:border-white/30 transition-colors">
                        <CheckCircle className="w-2.5 h-2.5 text-white/20 group-hover:text-white/60 transition-colors" />
                      </div>
                      <span className="text-white/40 group-hover:text-white transition-colors font-light text-sm tracking-wide">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-6">
                <h3 className="text-[10px] uppercase tracking-[0.4em] text-white/30 font-light">Delivery Timeline</h3>
                <div className="flex items-center gap-6 p-8 border border-white/5 bg-zinc-950/50 group hover:border-white/10 transition-all">
                  <Clock className="w-8 h-8 text-white/10 group-hover:text-white/30 transition-colors" />
                  <div className="space-y-1">
                    <p className="text-white font-light tracking-wide">Premium Turnaround</p>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-white/20">48-72 hours following the event</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="p-12 border border-white/5 bg-zinc-950 space-y-12 sticky top-32">
              <div className="space-y-3">
                <span className="text-[10px] uppercase tracking-[0.4em] text-white/20 font-light block">Investment</span>
                <div className="text-6xl font-light tracking-tighter text-white">
                  ${service.price.toLocaleString()}
                </div>
              </div>
              
              <div className="space-y-6">
                <AddToCartButton service={JSON.parse(JSON.stringify(service))} />
                <Link href="/cart" className="block">
                  <Button variant="outline" className="w-full rounded-none border-white/10 text-white/40 hover:text-white hover:bg-white/5 hover:border-white/20 py-8 text-[10px] uppercase tracking-[0.3em] transition-all font-light">
                    View Your Cart
                  </Button>
                </Link>
              </div>

              <div className="pt-6 border-t border-white/5">
                <p className="text-center text-[8px] uppercase tracking-[0.3em] text-white/20 leading-loose">
                  Secure processing <br /> & immediate confirmation
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
