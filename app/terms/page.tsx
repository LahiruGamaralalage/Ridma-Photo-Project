"use client";

export default function TermsPage() {
  return (
    <div className="bg-background min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6 md:px-12 max-w-4xl">
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <span className="text-white/40 tracking-[0.4em] uppercase text-xs">Legal</span>
          <h1 className="text-4xl md:text-6xl font-light text-white leading-tight">Terms of <span className="italic font-serif">Service</span></h1>
          
          <div className="space-y-12 text-white/70 font-light leading-relaxed pt-10 border-t border-white/5">
            <section className="space-y-4">
              <h2 className="text-2xl text-white font-light tracking-wide">1. Booking and Payments</h2>
              <p>All bookings require a deposit to secure your date. Final payment is due upon the completion of the session or as specified in your individual contract. We reserve the right to withhold deliverables until full payment is received.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl text-white font-light tracking-wide">2. Cancellation Policy</h2>
              <p>Cancellations made more than 48 hours before the scheduled session may be eligible for a partial refund or rescheduling. Last-minute cancellations are non-refundable except under extraordinary circumstances.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl text-white font-light tracking-wide">3. Delivery of Content</h2>
              <p>We aim to deliver edited content within 48 hours to 2 weeks, depending on the scale of the project. Digital galleries will be available for a limited time for download. We recommend that clients back up their delivered files immediately.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl text-white font-light tracking-wide">4. Copyright and Ownership</h2>
              <p>Ridma Photo retains copyright to all images produced. Clients are granted a license for personal or commercial use as specified in their booking agreement. Images may not be resold without explicit written permission.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl text-white font-light tracking-wide">5. Liability</h2>
              <p>While we take every precaution to ensure the safety of our equipment and data, Ridma Photo is not liable for technical failures or environmental factors beyond our control that may affect the final outcome of a session.</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
