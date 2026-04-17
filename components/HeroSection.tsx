import Link from "next/link";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1493863641943-9b68992a8d07?q=80&w=2058&auto=format&fit=crop')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/90"></div>
      </div>

      <div className="container relative z-10 mx-auto px-6 md:px-12 text-center flex flex-col items-center">
        <span className="text-white/60 tracking-[0.5em] uppercase text-[9px] md:text-[10px] mb-4 md:mb-5 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          Professional Photography
        </span>
        <h1 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-white leading-tight mb-6 md:mb-8 max-w-3xl animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
          Capturing <span className="italic font-serif">beautiful</span> moments inside lens and shutterspeed
        </h1>
        <div className="animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500">
          <Link href="/services">
            <Button size="lg" className="rounded-none bg-white text-black hover:bg-black hover:text-white px-7 py-5 md:px-8 md:py-6 text-[10px] md:text-xs tracking-widest uppercase transition-all duration-300 border border-white hover:border-black">
              Explore Services
            </Button>
          </Link>
        </div>
      </div>

      {/* Scroll Icon - Further reduced size */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <div className="w-4 h-7 border-[1.5px] border-white/20 rounded-full flex justify-center p-1">
          <div className="w-0.5 h-1.5 bg-white/40 rounded-full animate-bounce"></div>
        </div>
        <span className="text-[7px] uppercase tracking-[0.3em] text-white/30">Scroll</span>
      </div>
    </section>
  );
};

export default HeroSection;
