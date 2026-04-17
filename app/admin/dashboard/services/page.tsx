"use client";

import { useEffect, useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Plus, Image as ImageIcon, X, Upload } from "lucide-react";
import { CldUploadWidget } from 'next-cloudinary';
import Image from "next/image";

export default function ServicesPage() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editingService, setEditingService] = useState<any>(null);
  const [deletingServiceId, setDeletingServiceId] = useState<string | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>("");

  useEffect(() => {
    fetchServices();
  }, []);

  // Set uploaded image when editing
  useEffect(() => {
    if (editingService) {
      setUploadedImageUrl(editingService.image);
    } else {
      setUploadedImageUrl("");
    }
  }, [editingService]);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/services");
      if (res.ok) {
        const data = await res.json();
        setServices(data);
      }
    } catch (error) {
      toast.error("Failed to load services");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const title = formData.get("title")?.toString().trim();
    const description = formData.get("description")?.toString().trim();
    const price = Number(formData.get("price"));
    const category = formData.get("category")?.toString().trim();

    // Validations
    if (!title || !description || !uploadedImageUrl || !category) {
      toast.error("All fields including image are required");
      return;
    }

    if (isNaN(price) || price <= 0) {
      toast.error("Price must be a positive number");
      return;
    }

    const data = { title, description, price, image: uploadedImageUrl, category };

    const url = editingService ? `/api/services/${editingService._id}` : "/api/services";
    const method = editingService ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        toast.success(editingService ? "Service updated" : "Service created");
        setOpen(false);
        setEditingService(null);
        setUploadedImageUrl("");
        fetchServices();
      } else {
        toast.error("Operation failed");
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  const deleteService = async () => {
    if (!deletingServiceId) return;

    try {
      const res = await fetch(`/api/services/${deletingServiceId}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Service deleted");
        fetchServices();
      } else {
        toast.error("Failed to delete service");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setDeletingServiceId(null);
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-[10px] uppercase tracking-[0.4em] text-white/20 animate-pulse">Accessing Catalog...</div>
    </div>
  );

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
        <div className="space-y-4">
          <span className="text-white/40 tracking-[0.4em] uppercase text-xs">Portfolio</span>
          <h1 className="text-4xl md:text-5xl font-light text-white leading-tight">
            Service <span className="italic font-serif">Catalog</span>
          </h1>
        </div>
        <Dialog open={open} onOpenChange={(v) => { 
          setOpen(v); 
          if(!v) {
            setEditingService(null);
            setUploadedImageUrl("");
          }
        }}>
          <DialogTrigger render={
            <Button className="rounded-none bg-white text-black hover:bg-white/90 text-[10px] uppercase tracking-[0.3em] px-10 h-14 gap-3 transition-all font-light">
              <Plus size={14} /> Add New Service
            </Button>
          } />
          <DialogContent className="bg-zinc-950 border-white/10 text-white rounded-none sm:max-w-[550px] p-10">
            <DialogHeader className="mb-10 text-center">
              <DialogTitle className="text-xl font-light uppercase tracking-[0.3em] text-white">
                {editingService ? "Update" : "Define"} <span className="italic font-serif">Service</span>
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-6">
                <Input name="title" placeholder="SERVICE TITLE" defaultValue={editingService?.title} required className="rounded-none bg-white/5 border-white/10 h-14 text-[10px] tracking-widest placeholder:text-white/20 uppercase" />
                
                <textarea 
                  name="description" 
                  placeholder="SERVICE DESCRIPTION" 
                  defaultValue={editingService?.description} 
                  required 
                  className="w-full min-h-[120px] rounded-none bg-white/5 border-white/10 p-6 text-[10px] tracking-widest placeholder:text-white/20 focus:outline-none focus:border-white/20 transition-colors uppercase leading-loose"
                />

                <div className="grid grid-cols-2 gap-6">
                  <Input name="price" type="number" placeholder="PRICE ($)" defaultValue={editingService?.price} required className="rounded-none bg-white/5 border-white/10 h-14 text-[10px] tracking-widest uppercase" />
                  <Input name="category" placeholder="CATEGORY" defaultValue={editingService?.category || "Photography"} required className="rounded-none bg-white/5 border-white/10 h-14 text-[10px] tracking-widest uppercase" />
                </div>

                {/* Cloudinary Image Upload */}
                <div className="space-y-4">
                  <label className="text-[10px] uppercase tracking-widest text-white/30">Service Image</label>
                  
                  {uploadedImageUrl ? (
                    <div className="relative aspect-video w-full border border-white/10 overflow-hidden group">
                      <Image 
                        src={uploadedImageUrl} 
                        alt="Service Preview" 
                        fill 
                        className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                      />
                      <button 
                        type="button"
                        onClick={() => setUploadedImageUrl("")}
                        className="absolute top-2 right-2 bg-black/60 p-2 text-white hover:bg-white hover:text-black transition-all"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ) : (
                    <CldUploadWidget 
                      uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                      onSuccess={(result: any) => {
                        setUploadedImageUrl(result.info.secure_url);
                        toast.success("Image uploaded successfully");
                      }}
                    >
                      {({ open }) => {
                        return (
                          <button
                            type="button"
                            onClick={() => open()}
                            className="w-full h-32 border border-dashed border-white/10 bg-white/5 hover:bg-white/10 flex flex-col items-center justify-center gap-3 transition-all group"
                          >
                            <Upload className="w-5 h-5 text-white/20 group-hover:text-white/60 transition-colors" />
                            <span className="text-[10px] uppercase tracking-widest text-white/30 group-hover:text-white/60">Upload Image Asset</span>
                          </button>
                        );
                      }}
                    </CldUploadWidget>
                  )}
                </div>
              </div>
              
              <Button type="submit" className="w-full rounded-none bg-white text-black hover:bg-white/90 text-[10px] uppercase tracking-[0.3em] h-14 font-light transition-all">
                {editingService ? "Confirm Changes" : "Commit Service"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-zinc-950 border border-white/5 overflow-hidden rounded-none">
        <Table>
          <TableHeader className="bg-white/5">
            <TableRow className="border-white/5 hover:bg-transparent">
              <TableHead className="text-[10px] uppercase tracking-widest font-light text-white/40 h-16">Service</TableHead>
              <TableHead className="text-[10px] uppercase tracking-widest font-light text-white/40 h-16">Category</TableHead>
              <TableHead className="text-[10px] uppercase tracking-widest font-light text-white/40 h-16">Investment</TableHead>
              <TableHead className="text-[10px] uppercase tracking-widest font-light text-white/40 text-right h-16 px-8">Management</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {services.map((service) => (
              <TableRow key={service._id} className="border-white/5 hover:bg-white/5 transition-colors">
                <TableCell className="py-8">
                  <div className="flex items-center gap-8">
                    <div className="w-24 h-16 bg-white/5 border border-white/10 overflow-hidden relative grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-700 hidden sm:block">
                      <Image src={service.image} alt="" fill className="object-cover" />
                    </div>
                    <span className="text-sm font-light text-white tracking-[0.1em]">{service.title}</span>
                  </div>
                </TableCell>
                <TableCell className="text-white/40 text-[10px] uppercase tracking-[0.3em] font-light">
                  {service.category}
                </TableCell>
                <TableCell className="text-white text-sm font-light tracking-tighter">
                  ${service.price.toLocaleString()}
                </TableCell>
                <TableCell className="text-right px-8">
                  <div className="flex justify-end gap-6">
                    <button 
                      onClick={() => { setEditingService(service); setOpen(true); }}
                      className="text-white/20 hover:text-white transition-all uppercase text-[8px] tracking-[0.2em] font-light"
                    >
                      Refine
                    </button>
                    <button 
                      onClick={() => setDeletingServiceId(service._id)}
                      className="text-white/20 hover:text-red-500 transition-all uppercase text-[8px] tracking-[0.2em] font-light"
                    >
                      Discard
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={!!deletingServiceId} onOpenChange={(open) => !open && setDeletingServiceId(null)}>
        <AlertDialogContent className="bg-zinc-950 border-white/10 text-white rounded-none p-10">
          <AlertDialogHeader className="space-y-4">
            <AlertDialogTitle className="text-xl font-light uppercase tracking-[0.3em]">
              Confirm <span className="italic font-serif">Deletetion</span>
            </AlertDialogTitle>
            <AlertDialogDescription className="text-white/40 font-light text-sm tracking-wide">
              This action cannot be undone. This will permanently delete the service from your catalog.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-10 gap-4 p-0 m-0 bg-transparent border-none sm:justify-start">
            <AlertDialogCancel className="rounded-none border-white/10 text-white/40 hover:text-white hover:bg-white/5 text-[10px] uppercase tracking-[0.2em] h-12 px-8 font-light">
              Retain
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={deleteService}
              className="rounded-none bg-red-600/10 border border-red-600/20 text-red-500 hover:bg-red-600 hover:text-white text-[10px] uppercase tracking-[0.2em] h-12 px-8 font-light transition-all"
            >
              Discard Permanently
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
