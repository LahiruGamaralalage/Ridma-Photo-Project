import { Loader2 } from "lucide-react";

export default function GlobalLoading() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black">
      <div className="flex flex-col items-center gap-6">
        <div className="relative">
          <div className="w-16 h-16 border-t-2 border-white/20 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-[0.5em] text-white/40 font-light">
            Ridma <span className="italic font-serif">Photo</span>
          </span>
          <span className="text-[8px] uppercase tracking-[0.3em] text-white/20 animate-pulse">
            Processing Data
          </span>
        </div>
      </div>
    </div>
  );
}
