"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { projects } from "@/lib/projects";

const PortfolioCard = ({ id, title, tag, image }: { id: string, title: string, tag: string, image: string }) => (
  <div className="group relative overflow-hidden bg-zinc-900 animate-in fade-in slide-in-from-bottom-8 duration-1000">
    <div className="aspect-[16/10] relative">
      <Image 
        src={image} 
        alt={title} 
        fill 
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>
    </div>
    <div className="p-8 flex items-center justify-between border-b border-white/5 group-hover:bg-white transition-all duration-300">
      <div className="space-y-1">
        <span className="text-[10px] uppercase tracking-widest text-white/40 group-hover:text-black/60 transition-colors">{tag}</span>
        <h3 className="text-xl font-light tracking-wide text-white group-hover:text-black transition-colors">{title}</h3>
      </div>
      <Link href={`/projects/${id}`}>
        <Button 
          variant="outline" 
          className="rounded-none border-white/20 text-white group-hover:bg-black group-hover:text-white group-hover:border-black text-xs uppercase tracking-widest px-6 py-4 h-auto transition-all duration-300 hover:!bg-black/80"
        >
          More Details
        </Button>
      </Link>
    </div>
  </div>
);

const PortfolioSection = () => {
  return (
    <section id="portfolio" className="section-padding bg-background">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div className="space-y-4">
            <span className="text-white/40 tracking-[0.4em] uppercase text-xs md:text-sm">
              Portfolio
            </span>
            <h2 className="text-3xl md:text-5xl font-light text-white leading-tight">
              Selected works and <br className="hidden md:block" /> creative visions
            </h2>
          </div>
          <Link href="/projects">
            <Button variant="link" className="text-white hover:text-white/70 p-0 h-auto text-xs uppercase tracking-[0.3em] font-light transition-all">
              View all projects &rarr;
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
          {projects.slice(0, 4).map((project, index) => (
            <PortfolioCard key={index} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
