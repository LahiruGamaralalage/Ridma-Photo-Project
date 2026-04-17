const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
dotenv.config({ path: ".env.local" });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("Please define MONGODB_URI in .env.local");
  process.exit(1);
}

const AdminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const ServiceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  category: { type: String, default: "Photography" },
});

const Admin = mongoose.models.Admin || mongoose.model("Admin", AdminSchema);
const Service = mongoose.models.Service || mongoose.model("Service", ServiceSchema);

const services = [
  {
    title: "Wedding Photography",
    description: "Full day coverage, 500+ edited photos, and a custom photo album.",
    price: 1500,
    category: "Photography",
    image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Portrait Session",
    description: "High-end studio or lifestyle portraits with professional lighting.",
    price: 250,
    category: "Photography",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1974&auto=format&fit=crop"
  },
  {
    title: "Event Coverage",
    description: "Comprehensive coverage for your corporate events, parties, and more.",
    price: 500,
    category: "Events",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop"
  },
  {
    title: "Product Photography",
    description: "Clean, professional shots for your e-commerce store or catalog.",
    price: 150,
    category: "Commercial",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop"
  },
  {
    title: "Engagement Shoot",
    description: "Scenic outdoor sessions capturing your unique love story.",
    price: 400,
    category: "Photography",
    image: "https://images.unsplash.com/photo-1510076857177-7470076d4098?q=80&w=2072&auto=format&fit=crop"
  },
  {
    title: "Real Estate",
    description: "Professional interior and exterior shots for property listings.",
    price: 300,
    category: "Commercial",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop"
  },
];

async function seed() {
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB");

  // Create admin
  const adminExists = await Admin.findOne({ email: "admin@ridma.com" });
  if (!adminExists) {
    const hashedPassword = await bcrypt.hash("123456", 10);
    await Admin.create({
      email: "admin@ridma.com",
      password: hashedPassword,
    });
    console.log("Admin created: admin@ridma.com / 123456");
  } else {
    console.log("Admin already exists");
  }

  // Seed services
  const count = await Service.countDocuments();
  if (count === 0) {
    await Service.insertMany(services);
    console.log("Services seeded");
  } else {
    console.log("Services already exist");
  }

  await mongoose.disconnect();
  console.log("Disconnected from MongoDB");
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
