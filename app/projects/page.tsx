import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { projects } from "@/lib/projects";

export default function ProjectsPage() {
  return (
    <div className="bg-background min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6 md:px-12">
        <div className="space-y-6 mb-20">
          <span className="text-white/40 tracking-[0.4em] uppercase text-xs md:text-sm">
            Portfolio
          </span>
          <h1 className="text-4xl md:text-6xl font-light text-white leading-tight">
            Selected <span className="italic font-serif">works</span> & projects
          </h1>
          <p className="max-w-2xl text-white/50 font-light text-lg">
            A curated collection of visual stories across Sri Lanka, from the misty highlands 
            to the deep blue coasts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20">
          {projects.map((project) => (
            <div key={project.id} className="group space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
              <Link href={`/projects/${project.id}`} className="block relative aspect-[16/10] overflow-hidden bg-zinc-900">
                <Image 
                  src={project.image} 
                  alt={project.title} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>
              </Link>
              
              <div className="flex justify-between items-start border-b border-white/5 pb-8">
                <div className="space-y-2">
                  <span className="text-[10px] uppercase tracking-widest text-white/40">{project.tag}</span>
                  <h2 className="text-2xl md:text-3xl font-light text-white tracking-wide">{project.title}</h2>
                  <div className="flex gap-6 text-[10px] uppercase tracking-widest text-white/30 pt-2">
                    <span>{project.location}</span>
                    <span>{project.year}</span>
                  </div>
                </div>
                <Link href={`/projects/${project.id}`}>
                  <Button 
                    variant="outline" 
                    className="rounded-none border-white/20 text-white hover:bg-white hover:text-black px-8 py-6 text-[10px] uppercase tracking-widest transition-all"
                  >
                    View Project
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
