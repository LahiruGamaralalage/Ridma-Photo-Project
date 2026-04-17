import Link from "next/link";
import { Button } from "@/components/ui/button";

const ContactSection = () => {
  return (
    <section className="section-padding bg-black relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="container relative z-10 mx-auto px-6 md:px-12 text-center">
        <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in zoom-in-95 duration-1000">
          <span className="text-white/40 tracking-[0.5em] uppercase text-xs md:text-sm">
            Contact
          </span>
          <h2 className="text-4xl md:text-7xl lg:text-8xl font-light text-white leading-tight tracking-tight">
            Let’s discuss <br /> <span className="italic font-serif">your</span> vision
          </h2>
          <p className="text-white/60 font-light text-lg md:text-2xl max-w-2xl mx-auto leading-relaxed">
            Every project begins with a conversation. We are ready to bring 
            your creative ideas to life with professional execution.
          </p>
          <div className="pt-8">
            <Link href="/contact">
              <Button size="lg" className="rounded-none bg-white text-black hover:bg-white/90 px-16 py-10 text-lg tracking-widest uppercase transition-all hover:scale-105 active:scale-95">
                Let’s Talk
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
