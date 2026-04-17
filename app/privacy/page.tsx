"use client";

export default function PrivacyPage() {
  return (
    <div className="bg-background min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6 md:px-12 max-w-4xl">
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <span className="text-white/40 tracking-[0.4em] uppercase text-xs">Legal</span>
          <h1 className="text-4xl md:text-6xl font-light text-white leading-tight">Privacy <span className="italic font-serif">Policy</span></h1>
          
          <div className="space-y-12 text-white/70 font-light leading-relaxed pt-10 border-t border-white/5">
            <section className="space-y-4">
              <h2 className="text-2xl text-white font-light tracking-wide">1. Information We Collect</h2>
              <p>We collect information you provide directly to us when you book a session, sign up for our newsletter, or contact us. This may include your name, email address, phone number, and any other details relevant to your photography needs.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl text-white font-light tracking-wide">2. How We Use Your Information</h2>
              <p>We use the information we collect to provide, maintain, and improve our services, including to schedule sessions, process payments, and communicate with you about your projects and upcoming offers.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl text-white font-light tracking-wide">3. Image Rights and Usage</h2>
              <p>By using our services, you agree to our standard practices regarding the storage and usage of the photographs taken during your sessions. We respect your privacy and will only use images for promotional purposes with your explicit consent.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl text-white font-light tracking-wide">4. Data Security</h2>
              <p>We take reasonable measures to help protect information about you from loss, theft, misuse, and unauthorized access, disclosure, alteration, and destruction.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl text-white font-light tracking-wide">5. Contact Us</h2>
              <p>If you have any questions about this Privacy Policy, please contact us at ridmaphoto@gmail.com.</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
