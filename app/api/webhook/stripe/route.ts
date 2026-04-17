import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import connectToDatabase from "@/lib/db";
import Order from "@/models/Order";

import Stripe from "stripe";

import { resend } from "@/lib/resend";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature") as string;

  let event: Stripe.Event;

  try {
    if (!process.env.STRIPE_WEBHOOK_SECRET) {
      throw new Error("Missing STRIPE_WEBHOOK_SECRET");
    }
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error(`Webhook error: ${errorMessage}`);
    return NextResponse.json({ error: `Webhook error: ${errorMessage}` }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    // Fetch line items for this session
    const lineItems = await stripe.checkout.sessions.listLineItems(session.id);

    try {
      await connectToDatabase();

      const orderItems = lineItems.data.map((item: Stripe.LineItem) => ({
        productId: (item.price?.product as string) || "N/A",
        name: item.description || "Product",
        price: (item.amount_total || 0) / 100 / (item.quantity || 1),
        quantity: item.quantity || 1,
      }));

      const newOrder = new Order({
        customerName: session.metadata?.customerName || "Anonymous",
        email: session.metadata?.email,
        phone: session.metadata?.phone,
        eventDate: session.metadata?.eventDate,
        requirements: session.metadata?.requirements,
        items: orderItems,
        totalPrice: (session.amount_total || 0) / 100,
        stripeSessionId: session.id,
        status: "paid",
      });

      await newOrder.save();
      console.log(`Order saved successfully for session ${session.id}`);

      // Send confirmation email via Resend
      if (session.metadata?.email) {
        try {
          await resend.emails.send({
            from: "Ridma Photo <onboarding@resend.dev>",
            to: session.metadata.email,
            subject: "Your Photography Session is Confirmed - Ridma Photo",
            html: `
              <!DOCTYPE html>
              <html>
              <head>
                <meta charset="utf-8">
                <style>
                  body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #ffffff; color: #000000; margin: 0; padding: 0; }
                  .container { max-width: 600px; margin: 0 auto; padding: 40px; border: 1px solid #eeeeee; }
                  .header { text-align: center; margin-bottom: 40px; }
                  .logo { font-size: 24px; font-weight: 300; letter-spacing: 4px; text-transform: uppercase; color: #000000; }
                  .title { font-size: 32px; font-weight: 300; margin-bottom: 20px; line-height: 1.2; color: #000000; }
                  .highlight { font-style: italic; font-family: 'Georgia', serif; }
                  .content { font-size: 16px; line-height: 1.6; color: #000000; font-weight: 300; }
                  .summary-box { background-color: #fafafa; border: 1px solid #eeeeee; padding: 30px; margin: 40px 0; }
                  .summary-title { font-size: 12px; text-transform: uppercase; letter-spacing: 2px; color: #999999; margin-bottom: 20px; border-bottom: 1px solid #eeeeee; padding-bottom: 10px; }
                  .item-row { display: flex; justify-content: space-between; margin-bottom: 15px; border-bottom: 1px solid #eeeeee; padding-bottom: 10px; }
                  .item-name { color: #000000; font-weight: 400; }
                  .item-price { color: #000000; text-align: right; }
                  .total-row { display: flex; justify-content: space-between; margin-top: 30px; font-size: 20px; color: #000000; font-weight: 300; }
                  .footer { text-align: center; margin-top: 60px; font-size: 12px; color: #999999; letter-spacing: 1px; text-transform: uppercase; }
                  .accent-line { width: 40px; height: 1px; background-color: #000000; margin: 30px auto; opacity: 0.2; }
                </style>
              </head>
              <body>
                <div class="container">
                  <div class="header">
                    <div class="logo">RIDMA PHOTO</div>
                    <div class="accent-line"></div>
                  </div>
                  
                  <div class="title">Your vision is now our <span class="highlight">mission</span>.</div>
                  
                  <div class="content">
                    Dear ${session.metadata.customerName},<br><br>
                    Thank you for choosing Ridma Photo to capture your special moments. Your payment has been successfully processed, and your booking is confirmed.
                  </div>
                  
                  <div class="summary-box">
                    <div class="summary-title">Booking Summary</div>
                    ${orderItems.map(item => `
                      <div style="display: flex; justify-content: space-between; margin-bottom: 15px; border-bottom: 1px solid #eeeeee; padding-bottom: 10px;">
                        <span style="color: #000000;">${item.name} x ${item.quantity}</span>
                        <span style="color: #000000;">$${item.price * item.quantity}</span>
                      </div>
                    `).join('')}
                    
                    <div style="display: flex; justify-content: space-between; margin-top: 30px; font-size: 20px; color: #000000;">
                      <span style="text-transform: uppercase; font-size: 10px; letter-spacing: 2px; color: #999999; align-self: center;">Total Investment</span>
                      <span>$${(session.amount_total || 0) / 100}</span>
                    </div>
                  </div>
                  
                  <div class="content">
                    <strong>Event Date:</strong> ${session.metadata.eventDate}<br>
                    <strong>Contact Phone:</strong> ${session.metadata.phone}<br><br>
                    Our team will review your requirements and contact you within 24 hours to finalize the schedule and location. We look forward to working with you.
                  </div>
                  
                  <div class="footer">
                    &copy; ${new Date().getFullYear()} Ridma Photo Studio<br>
                    Capturing Essence, Frame by Frame
                  </div>
                </div>
              </body>
              </html>
            `
          });
          console.log(`Confirmation email sent to ${session.metadata.email}`);
        } catch (emailError) {
          console.error("Error sending confirmation email:", emailError);
        }
      }
    } catch (dbError: unknown) {
      const dbErrorMessage = dbError instanceof Error ? dbError.message : "Unknown error";
      console.error("Error saving order to MongoDB:", dbErrorMessage);
    }
  }

  return NextResponse.json({ received: true });
}
