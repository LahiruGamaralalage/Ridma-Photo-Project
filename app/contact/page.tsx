"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Phone, MapPin, Loader2, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  return (
    <div className="bg-background min-h-screen pt-40 pb-32">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            {/* Left Side: Cinematic Contact Info */}
            <div className="space-y-16">
              <div className="space-y-8">
                <span className="text-white/40 tracking-[0.5em] uppercase text-[10px]">
                  Availability: Open for Projects
                </span>
                <h1 className="text-5xl md:text-8xl font-light text-white leading-[0.9] tracking-tighter">
                  Let’s start <br /> <span className="italic font-serif">something</span> great
                </h1>
                <p className="text-white/50 font-light text-lg md:text-xl leading-relaxed max-w-md pt-4">
                  I'm always open to discussing new projects, creative ideas or 
                  opportunities to be part of your visions.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 pt-16 border-t border-white/5">
                <div className="space-y-3">
                  <h3 className="text-[10px] uppercase tracking-widest text-white/30 font-light flex items-center gap-2">
                    <MapPin className="w-3 h-3" /> Location
                  </h3>
                  <p className="text-white/80 font-light text-sm leading-relaxed">
                    134/7/A Kopiwatta,<br />Kadawatha, Sri Lanka
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="text-[10px] uppercase tracking-widest text-white/30 font-light flex items-center gap-2">
                    <Phone className="w-3 h-3" /> Phone
                  </h3>
                  <p className="text-white/80 font-light text-sm tracking-wide">
                    +94 777 391 866
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="text-[10px] uppercase tracking-widest text-white/30 font-light flex items-center gap-2">
                    <Mail className="w-3 h-3" /> Email
                  </h3>
                  <p className="text-white/80 font-light text-sm truncate">
                    ridmaphoto@gmail.com
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side: Elegant Form Container */}
            <div className="relative">
              {isSuccess ? (
                <div className="bg-zinc-950/50 border border-white/5 p-16 md:p-24 h-full flex flex-col items-center justify-center text-center space-y-8 animate-in fade-in zoom-in-95 duration-500 backdrop-blur-sm">
                  <div className="w-24 h-24 rounded-full border border-white/10 flex items-center justify-center">
                    <CheckCircle2 className="w-12 h-12 text-white" />
                  </div>
                  <div className="space-y-3">
                    <h2 className="text-3xl md:text-4xl font-light text-white">Message Sent</h2>
                    <p className="text-white/40 font-light max-w-xs mx-auto">Thank you for reaching out. I'll get back to you within 24 hours.</p>
                  </div>
                  <Button 
                    onClick={() => setIsSuccess(false)}
                    variant="outline" 
                    className="rounded-none border-white/10 text-white hover:bg-white hover:text-black mt-6 px-10 py-6 text-xs tracking-widest uppercase"
                  >
                    Send another
                  </Button>
                </div>
              ) : (
                <div className="bg-zinc-950/40 border border-white/5 p-12 md:p-16 backdrop-blur-sm">
                  <div className="mb-12">
                    <h3 className="text-[10px] uppercase tracking-[0.4em] text-white/30 font-light mb-2">Direct Message</h3>
                    <div className="w-10 h-[1px] bg-white/20"></div>
                  </div>
                  
                  <form onSubmit={handleSubmit} className="space-y-10">
                    <div className="space-y-12">
                      <div className="group space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-white/30 font-light pl-0 group-focus-within:text-white transition-colors">Full Name</label>
                        <Input 
                          placeholder="What's your name?" 
                          required 
                          className="rounded-none border-t-0 border-x-0 border-b border-white/10 bg-transparent px-0 py-4 focus-visible:ring-0 focus-visible:border-white transition-all placeholder:text-white/10 text-base"
                        />
                      </div>
                      <div className="group space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-white/30 font-light pl-0 group-focus-within:text-white transition-colors">Email Address</label>
                        <Input 
                          type="email" 
                          placeholder="Where can I reply to?" 
                          required 
                          className="rounded-none border-t-0 border-x-0 border-b border-white/10 bg-transparent px-0 py-4 focus-visible:ring-0 focus-visible:border-white transition-all placeholder:text-white/10 text-base"
                        />
                      </div>
                      <div className="group space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-white/30 font-light pl-0 group-focus-within:text-white transition-colors">Message</label>
                        <textarea 
                          placeholder="Tell me about your vision..." 
                          required 
                          rows={4}
                          className="w-full rounded-none border-t-0 border-x-0 border-b border-white/10 bg-transparent px-0 py-4 focus-visible:ring-0 focus-visible:border-white transition-all outline-none resize-none placeholder:text-white/10 text-base font-medium"
                        ></textarea>
                      </div>
                    </div>
                    
                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full rounded-none bg-white text-black hover:bg-black hover:text-white hover:border hover:border-white py-10 text-xs tracking-[0.3em] uppercase transition-all duration-500 flex gap-3 shadow-2xl"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        "Send Message"
                      )}
                    </Button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
