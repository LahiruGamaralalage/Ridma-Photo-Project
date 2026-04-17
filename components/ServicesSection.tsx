"use client";

import Image from "next/image";

const services = [
  {
    title: "Landscape",
    image: "https://images.unsplash.com/photo-1578517929034-db013fd86597?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Capturing the emerald tea plantations and misty highlands."
  },
  {
    title: "Wildlife",
    image: "https://images.unsplash.com/photo-1617867644194-550af3ae2c56?q=80&w=863&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Encounters with majestic elephants and elusive leopards."
  },
  {
    title: "Architectural",
    image: "https://images.unsplash.com/photo-1713038948592-5d070e8e8459?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "The colonial charm of Galle Fort and ancient ruins."
  },
  {
    title: "Travel",
    image: "https://images.unsplash.com/photo-1566766189268-ecac9118f2b7?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Stories from the iconic Nine Arch Bridge and coastal escapes."
  },
  {
    title: "Portrait",
    image: "https://images.unsplash.com/photo-1546590365-157e6a8b1e23?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Soulful captures of traditional stilt fishermen and heritage."
  }
];

const ServiceCard = ({ title, image, description }: { title: string, image: string, description: string }) => (
  <div className="group relative aspect-[3/4] overflow-hidden bg-zinc-900 animate-in fade-in zoom-in-95 duration-700">
    <Image 
      src={image} 
      alt={title} 
      fill 
      className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100"></div>
    <div className="absolute bottom-0 left-0 p-8 space-y-2 translate-y-4 transition-transform duration-300 group-hover:translate-y-0">
      <h3 className="text-2xl font-light text-white tracking-wide">{title}</h3>
      <p className="text-sm text-white/60 font-light opacity-0 transition-opacity duration-300 group-hover:opacity-100">{description}</p>
    </div>
  </div>
);

const ServicesSection = () => {
  return (
    <section className="section-padding bg-black overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <span className="text-white/40 tracking-[0.4em] uppercase text-xs md:text-sm">
              Our Expertise
            </span>
            <h2 className="text-3xl md:text-5xl font-light text-white">
              Sectors we excel in
            </h2>
          </div>
          <p className="max-w-md text-white/50 font-light leading-relaxed">
            Every category represents a unique challenge and a different story. 
            We approach each with specialized techniques and creative vision.
          </p>
        </div>
      </div>
      
      {/* Grid for desktop, horizontal scroll for mobile maybe, but grid looks better for premium */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-0">
        {services.map((service, index) => (
          <ServiceCard key={index} {...service} />
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
