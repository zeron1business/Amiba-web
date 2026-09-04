"use client";

import { useState } from "react";
import { products } from "@/data/products";
import { SectionReveal } from "@/components/shared/section-reveal";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  Loader2,
  AlertCircle,
} from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    company_name: "",
    contact_person: "",
    drug_license: "",
    gst_number: "",
    email: "",
    phone: "",
    message: "",
  });

  const toggleProduct = (name: string) => {
    setSelectedProducts((prev) =>
      prev.includes(name) ? prev.filter((p) => p !== name) : [...prev, name]
    );
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const constructMailtoUrl = () => {
    const subject = encodeURIComponent(
      `Quote Request from ${formData.company_name || "Institutional Client"}`
    );
    const body = encodeURIComponent(
      `AMIBA Pharmaceuticals Quote Request\n` +
      `----------------------------------------\n` +
      `Company Name: ${formData.company_name || "N/A"}\n` +
      `Contact Person: ${formData.contact_person || "N/A"}\n` +
      `Email: ${formData.email || "N/A"}\n` +
      `Phone: ${formData.phone || "N/A"}\n` +
      `Drug License No.: ${formData.drug_license || "Not provided"}\n` +
      `GST No.: ${formData.gst_number || "Not provided"}\n` +
      `Products of Interest: ${selectedProducts.length > 0 ? selectedProducts.join(", ") : "General Enquiry / All Products"}\n\n` +
      `Message / Requirements:\n${formData.message || "None provided"}\n`
    );
    return `mailto:contact@amibapharmaceuticals.com?subject=${subject}&body=${body}`;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    const payload = {
      "Company Name": formData.company_name,
      "Contact Person": formData.contact_person,
      "Email": formData.email,
      "Phone": formData.phone,
      "Drug License No": formData.drug_license || "Not provided",
      "GST No": formData.gst_number || "Not provided",
      "Products of Interest":
        selectedProducts.length > 0
          ? selectedProducts.join(", ")
          : "General Enquiry / All Products",
      "Message": formData.message || "No additional comments",
      _replyto: formData.email,
      _subject: `New Institutional Quote Request: ${formData.company_name} (${formData.contact_person})`,
      _template: "table",
      _captcha: "false",
    };

    try {
      const response = await fetch(
        "https://formsubmit.co/ajax/contact@amibapharmaceuticals.com",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();

      if (response.ok && (result.success === "true" || result.success === true)) {
        setSubmitted(true);
      } else if (result.message && result.message.includes("Activation")) {
        // FormSubmit sent the one-time activation confirmation to contact@amibapharmaceuticals.com
        setSubmitted(true);
      } else {
        throw new Error(result.message || "Failed to submit form.");
      }
    } catch {
      setErrorMessage(
        "We could not send your request automatically. You can email us directly with all your details using the button below."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <section className="pt-24 sm:pt-32 pb-16 sm:pb-24 bg-paper">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-20 h-20 rounded-full bg-signal-teal/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={40} className="text-signal-teal" />
          </div>
          <h1 className="text-display-lg text-ink mb-4">Quote request received</h1>
          <p className="text-body-lg text-slate mb-8">
            Thank you for your interest. All details have been sent directly to our team at{" "}
            <span className="font-semibold text-ink">contact@amibapharmaceuticals.com</span>. We will review your request and
            respond within 24 hours with institutional pricing and next steps.
          </p>
          <a href="/" className="btn-capsule btn-teal">
            Return Home
          </a>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="pt-24 sm:pt-32 pb-16 sm:pb-24 bg-paper">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <div className="text-center mb-16">
              <p className="text-editorial text-signal-teal text-base mb-3">
                Get in touch
              </p>
              <h1 className="text-display-lg text-ink mb-4">
                Request a Quote
              </h1>
              <p className="text-body-lg text-slate max-w-2xl mx-auto">
                Tell us about your institution and product requirements. Our
                team will respond within 24 hours.
              </p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 sm:gap-12">
            {/* Form */}
            <div className="lg:col-span-3">
              <SectionReveal>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {errorMessage && (
                    <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex flex-col gap-3">
                      <div className="flex items-start gap-2">
                        <AlertCircle size={18} className="text-red-600 flex-shrink-0 mt-0.5" />
                        <p>{errorMessage}</p>
                      </div>
                      <a
                        href={constructMailtoUrl()}
                        className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-red-600 text-white font-medium text-xs hover:bg-red-700 transition-colors w-fit"
                      >
                        <Mail size={14} />
                        Send via Email App
                      </a>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="company_name"
                        className="block text-sm font-medium text-ink mb-2"
                      >
                        Company Name *
                      </label>
                      <input
                        type="text"
                        id="company_name"
                        name="company_name"
                        required
                        value={formData.company_name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-mist bg-white text-ink placeholder:text-slate/50 focus:outline-none focus:border-signal-teal focus:ring-1 focus:ring-signal-teal transition-colors"
                        placeholder="Your institution name"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="contact_person"
                        className="block text-sm font-medium text-ink mb-2"
                      >
                        Contact Person *
                      </label>
                      <input
                        type="text"
                        id="contact_person"
                        name="contact_person"
                        required
                        value={formData.contact_person}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-mist bg-white text-ink placeholder:text-slate/50 focus:outline-none focus:border-signal-teal focus:ring-1 focus:ring-signal-teal transition-colors"
                        placeholder="Full name"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="drug_license"
                        className="block text-sm font-medium text-ink mb-2"
                      >
                        Drug License No.{" "}
                        <span className="text-slate/60 text-xs font-normal">
                          (Optional)
                        </span>
                      </label>
                      <input
                        type="text"
                        id="drug_license"
                        name="drug_license"
                        value={formData.drug_license}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-mist bg-white text-ink placeholder:text-slate/50 focus:outline-none focus:border-signal-teal focus:ring-1 focus:ring-signal-teal transition-colors"
                        placeholder="e.g., XX-XXXXX"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="gst_number"
                        className="block text-sm font-medium text-ink mb-2"
                      >
                        GST No.{" "}
                        <span className="text-slate/60 text-xs font-normal">
                          (Optional)
                        </span>
                      </label>
                      <input
                        type="text"
                        id="gst_number"
                        name="gst_number"
                        value={formData.gst_number}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-mist bg-white text-ink placeholder:text-slate/50 focus:outline-none focus:border-signal-teal focus:ring-1 focus:ring-signal-teal transition-colors"
                        placeholder="e.g., 27XXXXXXXXX1Z5"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-ink mb-2"
                      >
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-mist bg-white text-ink placeholder:text-slate/50 focus:outline-none focus:border-signal-teal focus:ring-1 focus:ring-signal-teal transition-colors"
                        placeholder="procurement@hospital.com"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-ink mb-2"
                      >
                        Phone *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-mist bg-white text-ink placeholder:text-slate/50 focus:outline-none focus:border-signal-teal focus:ring-1 focus:ring-signal-teal transition-colors"
                        placeholder="+91 XXXXX XXXXX"
                      />
                    </div>
                  </div>

                  {/* Product Selection */}
                  <div>
                    <label className="block text-sm font-medium text-ink mb-3">
                      Products of Interest
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {products.map((p) => (
                        <button
                          key={p.slug}
                          type="button"
                          onClick={() => toggleProduct(p.name)}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                            selectedProducts.includes(p.name)
                              ? "bg-signal-teal text-white"
                              : "bg-mist/50 text-slate hover:bg-mist"
                          }`}
                        >
                          {p.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-ink mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-mist bg-white text-ink placeholder:text-slate/50 focus:outline-none focus:border-signal-teal focus:ring-1 focus:ring-signal-teal transition-colors resize-none"
                      placeholder="Tell us about your requirements, estimated volumes, or any specific questions..."
                    />
                  </div>

                  <p className="text-xs text-slate">
                    By submitting this form, you confirm that you represent a
                    licensed healthcare institution or pharmacy. Account setup
                    requires valid Drug License and GST verification.
                  </p>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-capsule btn-primary w-full sm:w-auto inline-flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Sending Request...
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        Submit Quote Request
                      </>
                    )}
                  </button>

                  {/* Mailto fallback */}
                  <p className="text-xs text-slate mt-4">
                    Form not working?{" "}
                    <a
                      href={constructMailtoUrl()}
                      className="text-signal-teal hover:underline"
                    >
                      Email us directly at contact@amibapharmaceuticals.com
                    </a>
                  </p>
                </form>
              </SectionReveal>
            </div>

            {/* Contact Info Sidebar */}
            <div className="lg:col-span-2 order-first lg:order-last">
              <SectionReveal>
                <div className="glass-card p-6 sm:p-8 mb-6 sm:mb-8">
                  <h3 className="text-display-md !text-lg text-ink mb-6">
                    Contact Information
                  </h3>
                  <ul className="space-y-6">
                    <li className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-signal-teal/10 flex items-center justify-center flex-shrink-0">
                        <MapPin size={18} className="text-signal-teal" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-ink">Office</p>
                        <p className="text-sm text-slate mt-1">
                          AMIBA PHARMACEUTICALS
                          <br />
                          H.O. : 202/204 Lalji Donger Shee Building, 3rd Floor Room No. 28,
                          <br />
                          Norsinatha Street, Bath Bazar, Mumbai-400009
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-signal-teal/10 flex items-center justify-center flex-shrink-0">
                        <Phone size={18} className="text-signal-teal" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-ink">Phone</p>
                        <a
                          href="tel:+917407685123"
                          className="text-sm text-slate hover:text-signal-teal transition-colors"
                        >
                          7407685123 / 8617396557 / 813107158
                        </a>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-signal-teal/10 flex items-center justify-center flex-shrink-0">
                        <Mail size={18} className="text-signal-teal" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-ink">Email</p>
                        <a
                          href="mailto:contact@amibapharmaceuticals.com"
                          className="text-sm text-slate hover:text-signal-teal transition-colors"
                        >
                          contact@amibapharmaceuticals.com
                        </a>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-signal-teal/10 flex items-center justify-center flex-shrink-0">
                        <Clock size={18} className="text-signal-teal" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-ink">Hours</p>
                        <p className="text-sm text-slate mt-1">
                          Mon – Sat: 9:00 AM – 6:00 PM IST
                          <br />
                          Sunday: Closed
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>

                {/* Map placeholder */}
                <div className="rounded-xl overflow-hidden border border-mist bg-mist/30 aspect-[4/3] flex items-center justify-center">
                  <div className="text-center">
                    <MapPin size={32} className="text-slate/30 mx-auto mb-2" />
                    <p className="text-xs text-slate">
                      {/* TODO: REPLACE — Embed a real static map */}
                      Map placeholder — embed Google Maps static image
                    </p>
                  </div>
                </div>
              </SectionReveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
