import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { z } from "zod";

const checkoutSchema = z.object({
  customerName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  eventDate: z.string().refine((date) => {
    const selectedDate = new Date(date);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    return selectedDate >= tomorrow;
  }, "Event date must be in the future"),
  requirements: z.string().optional(),
  items: z.array(z.object({
    productId: z.string(),
    name: z.string(),
    price: z.number().positive(),
    quantity: z.number().int().positive()
  })).min(1, "Cart cannot be empty")
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Server-side validation
    const validation = checkoutSchema.safeParse(body);
    
    if (!validation.success) {
      const errorMessages = validation.error.issues.map(err => err.message).join(", ");
      return NextResponse.json({ error: errorMessages }, { status: 400 });
    }

    const { items, customerName, email, phone, eventDate, requirements } = validation.data;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: items.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
          },
          unit_amount: Math.round(item.price * 100), // Stripe expects cents
        },
        quantity: item.quantity,
      })),
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success?customer_name=${encodeURIComponent(customerName)}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/cancel`,
      metadata: {
        customerName,
        email,
        phone,
        eventDate,
        requirements: requirements || "",
      },
      customer_email: email,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: unknown) {
    console.error("Stripe session error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
