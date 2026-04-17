import mongoose, { Schema, Document } from "mongoose";

export interface IService extends Document {
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

const ServiceSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  category: { type: String, default: "Photography" },
});

export default mongoose.models.Service || mongoose.model<IService>("Service", ServiceSchema);
