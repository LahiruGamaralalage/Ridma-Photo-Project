"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ShoppingBag, Camera, Menu, X } from "lucide-react";
import LogoutButton from "./LogoutButton";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-black text-white font-sans">
      {/* Permanent Sidebar for Large Screens (lg: 1024px+) */}
      <aside className="w-72 border-r border-white/5 bg-zinc-950 hidden lg:flex flex-col sticky top-0 h-screen">
        <div className="p-10 border-b border-white/5">
          <Link href="/" className="text-xl font-light tracking-[0.3em] uppercase block text-center">
            RIDMA <span className="italic font-serif">PHOTO</span>
          </Link>
        </div>
        <nav className="flex-1 px-6 py-10 space-y-4">
          <SidebarItem href="/admin/dashboard" icon={<LayoutDashboard size={18} />} label="Overview" active={pathname === "/admin/dashboard"} />
          <SidebarItem href="/admin/dashboard/orders" icon={<ShoppingBag size={18} />} label="Client Orders" active={pathname === "/admin/dashboard/orders"} />
          <SidebarItem href="/admin/dashboard/services" icon={<Camera size={18} />} label="Services" active={pathname === "/admin/dashboard/services"} />
        </nav>
        <div className="p-6 border-t border-white/5">
           <LogoutButton />
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile/Tablet Header (lg: hidden) */}
        <header className="lg:hidden h-20 border-b border-white/5 bg-zinc-950/50 backdrop-blur-md sticky top-0 z-40 px-6 flex items-center justify-between">
          <Link href="/" className="text-sm font-light tracking-[0.3em] uppercase">
            RIDMA <span className="italic font-serif">PHOTO</span>
          </Link>
          
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger render={
              <Button variant="ghost" size="icon" className="hover:bg-white/5 text-white/60">
                <Menu size={24} />
              </Button>
            } />
            <SheetContent side="left" className="bg-zinc-950 border-white/5 p-0 w-72 text-white">
              <SheetHeader className="p-10 border-b border-white/5">
                <SheetTitle className="text-xl font-light tracking-[0.3em] uppercase text-center text-white">
                  RIDMA <span className="italic font-serif text-white">PHOTO</span>
                </SheetTitle>
              </SheetHeader>
              <nav className="flex-1 px-6 py-10 space-y-4">
                <SidebarItem 
                  href="/admin/dashboard" 
                  icon={<LayoutDashboard size={18} />} 
                  label="Overview" 
                  active={pathname === "/admin/dashboard"}
                  onClick={() => setOpen(false)} 
                />
                <SidebarItem 
                  href="/admin/dashboard/orders" 
                  icon={<ShoppingBag size={18} />} 
                  label="Client Orders" 
                  active={pathname === "/admin/dashboard/orders"}
                  onClick={() => setOpen(false)} 
                />
                <SidebarItem 
                  href="/admin/dashboard/services" 
                  icon={<Camera size={18} />} 
                  label="Services" 
                  active={pathname === "/admin/dashboard/services"}
                  onClick={() => setOpen(false)} 
                />
              </nav>
              <div className="p-6 border-t border-white/5 absolute bottom-0 w-full">
                <LogoutButton />
              </div>
            </SheetContent>
          </Sheet>
        </header>

        <main className="p-8 md:p-12 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}

function SidebarItem({ 
  href, 
  icon, 
  label, 
  active, 
  onClick 
}: { 
  href: string; 
  icon: React.ReactNode; 
  label: string; 
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <Link 
      href={href} 
      onClick={onClick}
      className={`flex items-center gap-4 px-6 py-4 text-[10px] uppercase tracking-[0.2em] font-light transition-all border ${
        active 
          ? "text-white bg-white/5 border-white/10" 
          : "text-white/40 hover:text-white hover:bg-white/5 border-transparent hover:border-white/5"
      }`}
    >
      <span className={active ? "text-white" : "text-white/20"}>{icon}</span>
      <span>{label}</span>
    </Link>
  );
}
