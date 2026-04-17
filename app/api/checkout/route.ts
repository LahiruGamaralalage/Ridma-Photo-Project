import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

interface CheckoutItem {
  name: string;
  price: number;
  quantity: number;
}

export async function POST(req: Request) {
  try {
    const { items, customerName, email, phone, eventDate, requirements } = await req.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "No items in cart" }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: items.map((item: CheckoutItem) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
          },
          unit_amount: Math.round(item.price * 100), // Stripe expects cents
        },
        quantity: item.quantity,
      })),
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout?success=true&customer_name=${encodeURIComponent(customerName)}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout?canceled=true`,
      metadata: {
        customerName,
        email,
        phone,
        eventDate,
        requirements,
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
