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
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { User, Mail, Phone, Calendar, ClipboardList, ShoppingBag } from "lucide-react";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/orders");
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    } catch (error) {
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/orders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        toast.success(`Order marked as ${newStatus}`);
        fetchOrders();
        if (selectedOrder && selectedOrder._id === id) {
          setSelectedOrder({ ...selectedOrder, status: newStatus });
        }
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-[10px] uppercase tracking-[0.4em] text-white/20 animate-pulse">Loading Records...</div>
    </div>
  );

  return (
    <div className="space-y-12">
      <div className="space-y-4">
        <span className="text-white/40 tracking-[0.4em] uppercase text-xs">Management</span>
        <h1 className="text-4xl md:text-5xl font-light text-white leading-tight">
          Client <span className="italic font-serif">Orders</span>
        </h1>
      </div>

      {orders.length === 0 ? (
        <div className="border border-white/5 bg-zinc-950 p-20 text-center">
          <p className="text-white/20 uppercase tracking-widest text-xs font-light italic">No orders found in the system.</p>
        </div>
      ) : (
        <div className="bg-zinc-950 border border-white/5 overflow-hidden rounded-none overflow-x-auto">
          <Table>
            <TableHeader className="bg-white/5">
              <TableRow className="border-white/5 hover:bg-transparent">
                <TableHead className="text-[10px] uppercase tracking-widest font-light text-white/40 h-16 min-w-[150px]">Customer</TableHead>
                <TableHead className="text-[10px] uppercase tracking-widest font-light text-white/40 h-16 hidden md:table-cell">Date</TableHead>
                <TableHead className="text-[10px] uppercase tracking-widest font-light text-white/40 h-16 hidden sm:table-cell">Items</TableHead>
                <TableHead className="text-[10px] uppercase tracking-widest font-light text-white/40 h-16">Total</TableHead>
                <TableHead className="text-[10px] uppercase tracking-widest font-light text-white/40 h-16">Status</TableHead>
                <TableHead className="text-[10px] uppercase tracking-widest font-light text-white/40 text-right h-16 pr-8">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow 
                  key={order._id} 
                  className="border-white/5 hover:bg-white/5 transition-colors cursor-pointer group"
                  onClick={() => setSelectedOrder(order)}
                >
                  <TableCell className="py-6 md:py-8">
                    <div className="flex flex-col gap-1.5">
                      <span className="text-sm font-light text-white tracking-wide group-hover:text-glow transition-all">{order.customerName}</span>
                      <span className="text-[9px] md:text-[10px] text-white/30 tracking-widest uppercase truncate max-w-[120px] md:max-w-none">{order.email}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-white/40 text-[10px] font-light uppercase tracking-widest hidden md:table-cell">
                    {new Date(order.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                  </TableCell>
                  <TableCell className="text-white/40 text-[10px] font-light uppercase tracking-widest hidden sm:table-cell">
                    {order.items.length} services
                  </TableCell>
                  <TableCell className="text-white text-sm font-light tracking-tighter">
                    ${order.totalPrice.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <span className={`text-[8px] uppercase tracking-[0.3em] font-light px-2 md:px-3 py-1 border ${
                      order.status === 'completed' 
                        ? 'border-white/20 text-white/80' 
                        : 'border-white/5 text-white/30'
                    }`}>
                      {order.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right pr-4 md:pr-8">
                    <div className="flex justify-end gap-2 md:gap-4">
                      <Button 
                        variant="link" 
                        className="text-[8px] uppercase tracking-[0.2em] text-white/20 hover:text-white p-0 h-auto hidden sm:block"
                      >
                        Details
                      </Button>
                      {order.status !== 'completed' && (
                        <Button 
                          onClick={(e) => {
                            e.stopPropagation();
                            updateStatus(order._id, 'completed');
                          }}
                          className="rounded-none bg-white/10 border border-white/20 text-white text-[8px] uppercase tracking-[0.2em] h-7 md:h-8 px-2 md:px-4 hover:bg-white hover:text-black transition-all font-light"
                        >
                          Complete
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Order Details Dialog */}
      <Dialog open={!!selectedOrder} onOpenChange={(open) => !open && setSelectedOrder(null)}>
        <DialogContent className="bg-zinc-950 border-white/10 text-white rounded-none w-[95vw] lg:max-w-4xl p-0 overflow-hidden outline-none">
          <div className="p-5 lg:p-10 border-b border-white/5 bg-white/[0.02]">
            <DialogHeader className="space-y-2 lg:space-y-4">
              <span className="text-[8px] lg:text-[10px] uppercase tracking-[0.4em] text-white/30 font-light block">Documentation</span>
              <DialogTitle className="text-xl lg:text-3xl font-light tracking-tight flex flex-col md:flex-row md:items-center justify-between gap-3 lg:gap-4">
                <span>{selectedOrder?.customerName} <span className="italic font-serif">Details</span></span>
                <span className={`w-fit text-[8px] lg:text-[10px] uppercase tracking-[0.3em] font-light px-3 lg:px-4 py-1 lg:py-1.5 border ${
                  selectedOrder?.status === 'completed' 
                    ? 'border-white/20 text-white/80' 
                    : 'border-white/5 text-white/30'
                }`}>
                  {selectedOrder?.status}
                </span>
              </DialogTitle>
            </DialogHeader>
          </div>

          <div className="p-5 lg:p-10 space-y-6 lg:space-y-12 max-h-[70vh] overflow-y-auto custom-scrollbar">
            {/* Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-10">
              <InfoBlock icon={<Mail size={14}/>} label="Email" value={selectedOrder?.email} />
              <InfoBlock icon={<Phone size={14}/>} label="Phone" value={selectedOrder?.phone} />
              <InfoBlock icon={<Calendar size={14}/>} label="Date" value={selectedOrder?.eventDate} />
              <InfoBlock icon={<User size={14}/>} label="Created" value={selectedOrder ? new Date(selectedOrder.createdAt).toLocaleString() : ''} />
            </div>

            {/* Requirements */}
            <div className="space-y-3 lg:space-y-4">
              <div className="flex items-center gap-3 text-white/20">
                <ClipboardList size={14} />
                <span className="text-[8px] lg:text-[10px] uppercase tracking-[0.3em] font-light">Requirements</span>
              </div>
              <p className="text-white/60 font-light text-xs lg:text-sm leading-relaxed bg-white/5 p-4 lg:p-6 border border-white/5">
                {selectedOrder?.requirements || "No specific requirements provided."}
              </p>
            </div>

            {/* Order Items */}
            <div className="space-y-4 lg:space-y-6">
              <div className="flex items-center gap-3 text-white/20">
                <ShoppingBag size={14} />
                <span className="text-[8px] lg:text-[10px] uppercase tracking-[0.3em] font-light">Breakdown</span>
              </div>
              <div className="border border-white/5 overflow-x-auto">
                <Table>
                  <TableHeader className="bg-white/5">
                    <TableRow className="border-white/5 hover:bg-transparent">
                      <TableHead className="text-[8px] lg:text-[9px] uppercase tracking-widest font-light text-white/40 h-8 lg:h-10 min-w-[120px]">Item</TableHead>
                      <TableHead className="text-[8px] lg:text-[9px] uppercase tracking-widest font-light text-white/40 h-8 lg:h-10 text-center">Qty</TableHead>
                      <TableHead className="text-[8px] lg:text-[9px] uppercase tracking-widest font-light text-white/40 h-8 lg:h-10 text-right pr-4 lg:pr-6">Price</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedOrder?.items.map((item: any, i: number) => (
                      <TableRow key={i} className="border-white/5 hover:bg-transparent">
                        <TableCell className="text-[10px] lg:text-xs font-light text-white/80 py-2.5 lg:py-4">{item.name}</TableCell>
                        <TableCell className="text-[10px] lg:text-xs font-light text-white/40 text-center py-2.5 lg:py-4">{item.quantity}</TableCell>
                        <TableCell className="text-[10px] lg:text-xs font-light text-white text-right py-2.5 lg:py-4 pr-4 lg:pr-6">${item.price.toLocaleString()}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow className="border-transparent bg-white/5">
                      <TableCell colSpan={2} className="text-[9px] lg:text-[10px] uppercase tracking-[0.3em] font-light text-white py-3 lg:py-6 pl-4 lg:pl-6">Total</TableCell>
                      <TableCell className="text-lg lg:text-xl font-light tracking-tighter text-white text-right pr-4 lg:pr-6 py-3 lg:py-6">${selectedOrder?.totalPrice.toLocaleString()}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>

          <div className="p-4 lg:p-8 border-t border-white/5 bg-white/[0.01] flex flex-col sm:flex-row justify-end gap-3 lg:gap-4">
            <Button 
              variant="outline" 
              onClick={() => setSelectedOrder(null)}
              className="rounded-none border-white/10 text-white/40 hover:text-white hover:bg-white/5 text-[9px] lg:text-[10px] uppercase tracking-[0.2em] h-10 lg:h-12 px-6 lg:px-8 font-light w-full sm:w-auto"
            >
              Close
            </Button>
            {selectedOrder?.status !== 'completed' && (
              <Button 
                onClick={() => updateStatus(selectedOrder._id, 'completed')}
                className="rounded-none bg-white text-black hover:bg-white/90 text-[9px] lg:text-[10px] uppercase tracking-[0.2em] h-10 lg:h-12 px-6 lg:px-8 font-light transition-all w-full sm:w-auto"
              >
                Complete Order
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function InfoBlock({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="space-y-1.5 lg:space-y-2">
      <div className="flex items-center gap-3 text-white/20">
        {icon}
        <span className="text-[8px] lg:text-[9px] uppercase tracking-[0.3em] font-light">{label}</span>
      </div>
      <p className="text-white font-light tracking-wide pl-6 lg:pl-7 text-xs lg:text-sm">{value}</p>
    </div>
  );
}
