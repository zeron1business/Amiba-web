import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "AMIBA Healthcare privacy policy — how we collect, use, and protect your data.",
};

export default function PrivacyPage() {
  return (
    <section className="pt-24 sm:pt-32 pb-16 sm:pb-24 bg-paper">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-display-lg text-ink mb-4">Privacy Policy</h1>
        <p className="text-body-sm text-slate mb-12">
          Last updated: August 2026
        </p>

        <div className="prose-amiba space-y-8">
          <div>
            <h2 className="text-display-md !text-xl text-ink mb-3">1. Introduction</h2>
            <p className="text-body text-slate leading-relaxed">
              AMIBA PHARMACEUTICALS (&ldquo;AMIBA,&rdquo; &ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is committed to protecting the privacy and security of the personal information of our business partners, website visitors, and other stakeholders. This Privacy Policy explains how we collect, use, store, and protect your information when you interact with our website and services.
            </p>
          </div>

          <div>
            <h2 className="text-display-md !text-xl text-ink mb-3">2. Information We Collect</h2>
            <p className="text-body text-slate leading-relaxed mb-4">
              We collect information that you provide directly to us, including:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-body text-slate">
              <li>Business contact information (company name, contact person, email, phone number)</li>
              <li>Regulatory credentials (Drug License number, GST number) for account verification</li>
              <li>Delivery addresses and logistics preferences</li>
              <li>Product enquiry and order history</li>
              <li>Communication records between you and our team</li>
            </ul>
          </div>

          <div>
            <h2 className="text-display-md !text-xl text-ink mb-3">3. How We Use Your Information</h2>
            <p className="text-body text-slate leading-relaxed mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-body text-slate">
              <li>Process and fulfil your product enquiries and orders</li>
              <li>Verify your business credentials as required by pharmaceutical regulations</li>
              <li>Communicate with you about orders, deliveries, and account matters</li>
              <li>Improve our products, services, and website experience</li>
              <li>Comply with legal and regulatory obligations</li>
            </ul>
          </div>

          <div>
            <h2 className="text-display-md !text-xl text-ink mb-3">4. Data Security</h2>
            <p className="text-body text-slate leading-relaxed">
              We implement appropriate technical and organisational measures to protect your personal information against unauthorised access, alteration, disclosure, or destruction. This includes encryption of sensitive data, access controls, and regular security assessments.
            </p>
          </div>

          <div>
            <h2 className="text-display-md !text-xl text-ink mb-3">5. Data Sharing</h2>
            <p className="text-body text-slate leading-relaxed">
              We do not sell or rent your personal information to third parties. We may share your information with trusted service providers (logistics partners, payment processors) solely for the purpose of fulfilling our services to you, and with regulatory authorities as required by law.
            </p>
          </div>

          <div>
            <h2 className="text-display-md !text-xl text-ink mb-3">6. Your Rights</h2>
            <p className="text-body text-slate leading-relaxed">
              You have the right to access, correct, or request deletion of your personal information. To exercise these rights, please contact us at the email address provided below.
            </p>
          </div>

          <div>
            <h2 className="text-display-md !text-xl text-ink mb-3">7. Contact Us</h2>
            <p className="text-body text-slate leading-relaxed">
              For any privacy-related questions or requests, please contact us at:{" "}
              <a href="mailto:contact@amibapharmaceuticals.com" className="text-signal-teal hover:underline">
                contact@amibapharmaceuticals.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
