import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "AMIBA Healthcare terms of use — governing the use of our website and services.",
};

export default function TermsPage() {
  return (
    <section className="pt-24 sm:pt-32 pb-16 sm:pb-24 bg-paper">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-display-lg text-ink mb-4">Terms of Use</h1>
        <p className="text-body-sm text-slate mb-12">
          Last updated: August 2026
        </p>

        <div className="space-y-8">
          <div>
            <h2 className="text-display-md !text-xl text-ink mb-3">1. Acceptance of Terms</h2>
            <p className="text-body text-slate leading-relaxed">
              By accessing and using the AMIBA Healthcare website (&ldquo;the Site&rdquo;), you agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use the Site. AMIBA PHARMACEUTICALS reserves the right to modify these terms at any time without prior notice.
            </p>
          </div>

          <div>
            <h2 className="text-display-md !text-xl text-ink mb-3">2. Nature of the Site</h2>
            <p className="text-body text-slate leading-relaxed">
              This website is an informational and enquiry platform for AMIBA&apos;s B2B pharmaceutical and medical supply services. It is not an e-commerce platform. No purchase transactions are completed through this website. All commercial transactions are conducted through AMIBA&apos;s separate B2B ordering platform, subject to separate terms and conditions.
            </p>
          </div>

          <div>
            <h2 className="text-display-md !text-xl text-ink mb-3">3. Eligibility</h2>
            <p className="text-body text-slate leading-relaxed">
              AMIBA&apos;s products and services are available exclusively to licensed healthcare institutions, pharmacies, and authorized medical distributors. By submitting a quote request or enquiry, you represent that you are authorized to act on behalf of a licensed business entity and that your Drug License and GST registration are valid and current.
            </p>
          </div>

          <div>
            <h2 className="text-display-md !text-xl text-ink mb-3">4. Product Information</h2>
            <p className="text-body text-slate leading-relaxed">
              While we make every effort to ensure the accuracy of product information on this website, product specifications, certifications, pack sizes, and availability may change without notice. Product images are for illustrative purposes only and may not exactly represent the actual product packaging. Always refer to the product label and package insert for the most current and complete information.
            </p>
          </div>

          <div>
            <h2 className="text-display-md !text-xl text-ink mb-3">5. Intellectual Property</h2>
            <p className="text-body text-slate leading-relaxed">
              All content on this website, including but not limited to text, graphics, logos, images, and software, is the property of AMIBA PHARMACEUTICALS and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works from any content on this website without our prior written consent.
            </p>
          </div>

          <div>
            <h2 className="text-display-md !text-xl text-ink mb-3">6. Limitation of Liability</h2>
            <p className="text-body text-slate leading-relaxed">
              AMIBA PHARMACEUTICALS provides this website on an &ldquo;as is&rdquo; basis. We make no warranties, express or implied, regarding the accuracy, completeness, or reliability of the information on this website. In no event shall AMIBA be liable for any indirect, incidental, or consequential damages arising from your use of this website.
            </p>
          </div>

          <div>
            <h2 className="text-display-md !text-xl text-ink mb-3">7. Governing Law</h2>
            <p className="text-body text-slate leading-relaxed">
              These Terms of Use shall be governed by and construed in accordance with the laws of India. Any disputes arising from or in connection with these terms shall be subject to the exclusive jurisdiction of the courts in Mumbai, Maharashtra.
            </p>
          </div>

          <div>
            <h2 className="text-display-md !text-xl text-ink mb-3">8. Contact</h2>
            <p className="text-body text-slate leading-relaxed">
              For any questions regarding these terms, please contact us at:{" "}
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
