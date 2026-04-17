import dbConnect from "@/lib/db";
import Order from "@/models/Order";
import Service from "@/models/Service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingBag, Camera, DollarSign } from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

export const dynamic = "force-dynamic";

async function getDashboardData() {
  await dbConnect();
  const totalOrders = await Order.countDocuments();
  const totalServices = await Service.countDocuments();
  const orders = await Order.find().sort({ createdAt: -1 });
  const totalRevenue = orders.reduce((acc, order) => acc + order.totalPrice, 0);
  
  // Get 5 most recent orders for the dashboard table
  const recentOrders = orders.slice(0, 5);
  
  return {
    totalOrders,
    totalServices,
    totalRevenue,
    recentOrders
  };
}

export default async function AdminDashboard() {
  const data = await getDashboardData();

  return (
    <div className="space-y-12 pb-20">
      <div className="space-y-4">
        <span className="text-white/40 tracking-[0.4em] uppercase text-xs">Summary</span>
        <h1 className="text-4xl md:text-5xl font-light text-white leading-tight">
          Admin <span className="italic font-serif">Overview</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <StatsCard 
          title="Total Orders" 
          value={data.totalOrders} 
          icon={<ShoppingBag className="w-5 h-5" />} 
        />
        <StatsCard 
          title="Total Services" 
          value={data.totalServices} 
          icon={<Camera className="w-5 h-5" />} 
        />
        <StatsCard 
          title="Total Revenue" 
          value={`$${data.totalRevenue.toLocaleString()}`} 
          icon={<DollarSign className="w-5 h-5" />} 
        />
      </div>

      <div className="space-y-8 pt-12 border-t border-white/5">
        <div className="flex justify-between items-end">
          <div className="space-y-2">
            <span className="text-white/30 tracking-[0.3em] uppercase text-[10px]">Recent Activity</span>
            <h2 className="text-2xl font-light text-white">Latest <span className="italic font-serif">Orders</span></h2>
          </div>
        </div>

        <div className="bg-zinc-950 border border-white/5 overflow-hidden">
          <Table>
            <TableHeader className="bg-white/5">
              <TableRow className="border-white/5 hover:bg-transparent">
                <TableHead className="text-[10px] uppercase tracking-widest font-light text-white/40 h-14">Customer</TableHead>
                <TableHead className="text-[10px] uppercase tracking-widest font-light text-white/40 h-14">Items</TableHead>
                <TableHead className="text-[10px] uppercase tracking-widest font-light text-white/40 h-14">Total</TableHead>
                <TableHead className="text-[10px] uppercase tracking-widest font-light text-white/40 h-14">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.recentOrders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-10 text-white/20 text-[10px] uppercase tracking-widest italic">
                    No orders recorded yet.
                  </TableCell>
                </TableRow>
              ) : (
                data.recentOrders.map((order) => (
                  <TableRow key={order._id} className="border-white/5 hover:bg-white/5 transition-colors">
                    <TableCell className="py-6">
                      <div className="flex flex-col">
                        <span className="text-sm font-light text-white">{order.customerName}</span>
                        <span className="text-[9px] text-white/30 tracking-widest uppercase">{order.email}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-white/40 text-[10px] font-light uppercase tracking-widest">
                      {order.items.length} items
                    </TableCell>
                    <TableCell className="text-white text-sm font-light tracking-tighter">
                      ${order.totalPrice.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <span className={`text-[8px] uppercase tracking-[0.3em] font-light px-2 py-0.5 border ${
                        order.status === 'completed' 
                          ? 'border-white/20 text-white/80' 
                          : 'border-white/5 text-white/30'
                      }`}>
                        {order.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

function StatsCard({ title, value, icon }: { title: string; value: string | number; icon: React.ReactNode }) {
  return (
    <Card className="bg-zinc-950 border-white/5 rounded-none p-6 group hover:border-white/10 transition-all">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
        <CardTitle className="text-[10px] uppercase tracking-[0.3em] font-light text-white/40 group-hover:text-white/60 transition-colors">
          {title}
        </CardTitle>
        <div className="text-white/20 group-hover:text-white/40 transition-colors">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-light tracking-tighter text-white">{value}</div>
      </CardContent>
    </Card>
  );
}
