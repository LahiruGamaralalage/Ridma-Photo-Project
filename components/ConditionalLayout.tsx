"use client";

import { usePathname, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";
import { useEffect, useState } from "react";

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  useEffect(() => {
    // Handle the full window load (including images)
    if (document.readyState === "complete") {
      setIsPageLoaded(true);
    } else {
      const handleLoad = () => setIsPageLoaded(true);
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  return (
    <>
      {/* Initial Asset Preloader */}
      {!isPageLoaded && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black transition-opacity duration-1000">
          <div className="flex flex-col items-center gap-4">
            <span className="text-2xl font-light tracking-[0.4em] text-white uppercase">
              Ridma <span className="italic font-serif">Photo</span>
            </span>
            <div className="w-40 h-[1px] bg-white/10 relative overflow-hidden">
              <div className="absolute inset-0 bg-white/40 animate-progress origin-left"></div>
            </div>
          </div>
        </div>
      )}

      {!isAdmin && <Navbar />}
      <main className={`${isAdmin ? "" : "min-h-screen"} ${!isPageLoaded ? "opacity-0" : "opacity-100 transition-opacity duration-1000"}`}>
        {children}
      </main>
      {!isAdmin && <Footer />}
      <Toaster position="bottom-right" />
    </>
  );
}
