import { projects } from "@/lib/projects";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, Calendar, Camera, Sparkles } from "lucide-react";

export default async function ProjectDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  return (
    <div className="bg-background min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6 md:px-12">
        {/* Back Link */}
        <div className="flex items-center gap-4 mb-12">
          <Link href="/projects" className="text-white/40 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <span className="text-white/40 tracking-[0.4em] uppercase text-[10px]">{project.tag}</span>
        </div>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start mb-32">
          <div className="space-y-12">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-8xl font-light text-white leading-tight tracking-tighter">
                {project.title}
              </h1>
              <p className="text-xl text-white/60 font-light leading-relaxed max-w-xl">
                {project.description}
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-12 py-10 border-y border-white/5">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-white/30">
                  <MapPin className="w-3 h-3" />
                  <span className="text-[10px] uppercase tracking-widest font-light">Location</span>
                </div>
                <p className="text-white font-light">{project.location}</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-white/30">
                  <Calendar className="w-3 h-3" />
                  <span className="text-[10px] uppercase tracking-widest font-light">Year</span>
                </div>
                <p className="text-white font-light">{project.year}</p>
              </div>
            </div>

            <div className="space-y-10">
              <div className="space-y-4">
                <h3 className="text-xs uppercase tracking-[0.3em] text-white/40 font-light flex items-center gap-2">
                  <Sparkles className="w-3 h-3" /> The Vision
                </h3>
                <p className="text-white/70 font-light leading-relaxed">
                  {project.vision}
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xs uppercase tracking-[0.3em] text-white/40 font-light">Key Highlights</h3>
                <ul className="space-y-3">
                  {project.highlights.map((item, i) => (
                    <li key={i} className="text-white/60 font-light text-sm flex items-center gap-3">
                      <div className="w-1 h-1 bg-white/20 rounded-full"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-xs uppercase tracking-[0.3em] text-white/40 font-light flex items-center gap-2">
                  <Camera className="w-3 h-3" /> Equipment Used
                </h3>
                <div className="flex flex-wrap gap-3">
                  {project.equipment.map((item, i) => (
                    <span key={i} className="text-[10px] uppercase tracking-widest border border-white/10 px-3 py-1 text-white/40">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative aspect-[4/5] overflow-hidden bg-zinc-900 sticky top-32">
            <Image 
              src={project.image} 
              alt={project.title} 
              fill 
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Gallery Section */}
        <div className="space-y-20 pt-20 border-t border-white/5">
          <div className="space-y-4">
            <span className="text-white/40 tracking-[0.4em] uppercase text-xs md:text-sm">Extended Gallery</span>
            <h2 className="text-3xl md:text-5xl font-light text-white">Visual <span className="italic font-serif">Narrative</span></h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {project.gallery.map((img, index) => (
              <div key={index} className="relative aspect-[16/10] overflow-hidden bg-zinc-900 group">
                <Image 
                  src={img} 
                  alt={`${project.title} gallery ${index}`} 
                  fill 
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Next Project / CTA */}
        <div className="mt-40 pt-20 border-t border-white/5 text-center">
          <Link href="/projects">
            <Button variant="outline" className="rounded-none border-white/20 text-white hover:bg-white hover:text-black px-12 py-8 text-sm tracking-[0.2em] uppercase transition-all">
              View all projects
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
