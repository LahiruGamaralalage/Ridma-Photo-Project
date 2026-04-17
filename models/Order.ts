import mongoose, { Schema, Document } from "mongoose";

export interface IOrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

export interface IOrder extends Document {
  customerName: string;
  email: string;
  phone: string;
  eventDate: string;
  requirements?: string;
  items: IOrderItem[];
  totalPrice: number;
  stripeSessionId?: string;
  status: string;
  createdAt: Date;
}

const OrderItemSchema = new Schema({
  productId: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const OrderSchema: Schema = new Schema({
  customerName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  eventDate: { type: String, required: true },
  requirements: { type: String },
  items: [OrderItemSchema],
  totalPrice: { type: Number, required: true },
  stripeSessionId: { type: String },
  status: { type: String, default: "pending" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);
