"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/admin/logout", { method: "POST" });
      if (res.ok) {
        toast.success("Logged out successfully");
        router.push("/admin");
      }
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  return (
    <button 
      onClick={handleLogout}
      className="flex w-full items-center gap-3 px-4 py-3 text-[10px] uppercase tracking-widest font-light text-white/40 hover:text-white hover:bg-white/5 transition-all rounded-none"
    >
      <LogOut size={14} />
      <span>Sign Out</span>
    </button>
  );
}
