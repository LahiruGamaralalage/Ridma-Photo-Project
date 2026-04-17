"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

const AboutSection = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
          <div className="space-y-8 animate-in fade-in slide-in-from-left-8 duration-1000">
            <span className="text-white/40 tracking-[0.4em] uppercase text-xs md:text-sm">
              Our Passion
            </span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-light text-white leading-tight">
              Photography is driven by passion for capturing life’s most precious moments
            </h2>
            <div className="pt-4">
              <Button 
                onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
                variant="outline" 
                className="rounded-none border-white/20 text-white hover:bg-white hover:text-black px-10 py-6 uppercase text-xs tracking-widest"
              >
                Learn More
              </Button>
            </div>
          </div>
          
          <div className="space-y-6 text-white/60 font-light leading-relaxed text-lg md:text-xl animate-in fade-in slide-in-from-right-8 duration-1000 delay-200">
            <p>
              We believe that every frame tells a story. At Ridma Photo, we specialize in 
              turning fleeting instances into eternal memories. Our approach is minimal, 
              cinematic, and deeply personal.
            </p>
            <p>
              From the vast landscapes of the wild to the intricate details of architectural 
              marvels, we bring a unique lens to every project. Our commitment to excellence 
              ensures that every image we deliver is a masterpiece of light and composition.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
