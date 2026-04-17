"use client";

const awards = [
  {
    year: "2024",
    title: "Sri Lankan Photographer of the Year",
    organization: "National Photographic Art Society",
    category: "Landscape"
  },
  {
    year: "2023",
    title: "Excellence in Island Wildlife",
    organization: "WildLife Conservation Society SL",
    category: "Wildlife"
  },
  {
    year: "2022",
    title: "Heritage Architectural Series",
    organization: "Sri Lanka Institute of Architects",
    category: "Architectural"
  },
  {
    year: "2021",
    title: "Cultural Portrait Award",
    organization: "State Art Festival",
    category: "Portrait"
  }
];

const AwardsSection = () => {
  return (
    <section className="section-padding bg-zinc-950">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row gap-16 md:gap-32">
          <div className="md:w-1/3 space-y-6">
            <span className="text-white/40 tracking-[0.4em] uppercase text-xs">
              Recognition
            </span>
            <h2 className="text-3xl md:text-5xl font-light text-white leading-tight">
              Awards and <br /> Experience
            </h2>
            <p className="text-white/50 font-light leading-relaxed">
              Our commitment to the art of photography has been recognized by 
              leading organizations worldwide. We continue to push the boundaries 
              of visual storytelling.
            </p>
          </div>
          
          <div className="md:w-2/3 divide-y divide-white/10 border-t border-white/10">
            {awards.map((award, index) => (
              <div 
                key={index} 
                className="group flex flex-col md:flex-row md:items-center justify-between py-10 gap-4 transition-all duration-300 hover:px-4"
              >
                <div className="flex items-center gap-12 md:gap-24">
                  <span className="text-white/30 font-light tracking-widest text-lg group-hover:text-white transition-colors">
                    {award.year}
                  </span>
                  <div className="space-y-1">
                    <h3 className="text-xl md:text-2xl font-light text-white tracking-wide">{award.title}</h3>
                    <p className="text-sm text-white/50 uppercase tracking-widest font-light">{award.organization}</p>
                  </div>
                </div>
                <div className="md:text-right">
                  <span className="text-[10px] uppercase tracking-[0.3em] font-light text-white/40 border border-white/10 px-3 py-1 rounded-full group-hover:border-white/40 transition-colors">
                    {award.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AwardsSection;
