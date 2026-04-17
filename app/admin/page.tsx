"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Login successful");
        router.push("/admin/dashboard");
      } else {
        toast.error(data.error || "Login failed");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-6">
      <Card className="w-full max-w-md bg-zinc-950 border-white/10 rounded-none">
        <CardHeader className="space-y-4">
          <div className="flex justify-center mb-4">
            <span className="text-xl font-light tracking-[0.3em]">
              RIDMA <span className="italic font-serif">PHOTO</span>
            </span>
          </div>
          <CardTitle className="text-2xl font-light text-center text-white uppercase tracking-widest">
            Admin <span className="italic font-serif">Access</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="EMAIL ADDRESS"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white/5 border-white/10 text-white placeholder:text-white/20 rounded-none h-12 text-[10px] tracking-widest"
              />
            </div>
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="PASSWORD"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-white/5 border-white/10 text-white placeholder:text-white/20 rounded-none h-12 text-[10px] tracking-widest"
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full rounded-none bg-white text-black hover:bg-white/90 h-12 text-[10px] uppercase tracking-[0.3em] font-light transition-all"
            >
              {loading ? "AUTHENTICATING..." : "SIGN IN"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
