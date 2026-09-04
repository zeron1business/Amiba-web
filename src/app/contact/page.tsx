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

interface FormErrors {
  company_name?: string;
  contact_person?: string;
  drug_license?: string;
  gst_number?: string;
  email?: string;
  phone?: string;
  products?: string;
  message?: string;
}

function validateForm(
  data: {
    company_name: string;
    contact_person: string;
    drug_license: string;
    gst_number: string;
    email: string;
    phone: string;
    message: string;
  },
  selectedProds: string[]
): FormErrors {
  const errors: FormErrors = {};

  // Company Name validation
  const trimmedCompany = data.company_name.trim();
  if (!trimmedCompany) {
    errors.company_name = "Company or institution name is required.";
  } else if (trimmedCompany.length < 2) {
    errors.company_name = "Company name must be at least 2 characters.";
  }

  // Contact Person validation
  const trimmedPerson = data.contact_person.trim();
  if (!trimmedPerson) {
    errors.contact_person = "Contact person name is required.";
  } else if (trimmedPerson.length < 2) {
    errors.contact_person = "Contact person name must be at least 2 characters.";
  } else if (!/^[a-zA-Z\s.'-]+$/.test(trimmedPerson)) {
    errors.contact_person = "Name should contain only letters and spaces.";
  }

  // Drug License No. validation (Optional, but if filled must be valid)
  const trimmedDL = data.drug_license.trim();
  if (trimmedDL) {
    if (trimmedDL.length < 3 || trimmedDL.length > 40) {
      errors.drug_license = "Drug License number should be between 3 and 40 characters.";
    } else if (!/^[a-zA-Z0-9\/\-,\s]+$/.test(trimmedDL)) {
      errors.drug_license = "Drug License contains invalid characters.";
    }
  }

  // GST No. validation (Optional, but if filled must match GSTIN format)
  const trimmedGST = data.gst_number.trim();
  if (trimmedGST) {
    const gstPattern = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/i;
    if (!gstPattern.test(trimmedGST)) {
      errors.gst_number = "Please enter a valid 15-character GSTIN (e.g., 27ABCDE1234F1Z5).";
    }
  }

  // Email validation
  const trimmedEmail = data.email.trim();
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!trimmedEmail) {
    errors.email = "Business email address is required.";
  } else if (!emailPattern.test(trimmedEmail)) {
    errors.email = "Please enter a valid email address (e.g., name@domain.com).";
  }

  // Phone validation
  const trimmedPhone = data.phone.trim();
  const cleanPhone = trimmedPhone.replace(/[\s\-\(\)\+]/g, "");
  const normalizedPhone =
    cleanPhone.startsWith("91") && cleanPhone.length === 12
      ? cleanPhone.slice(2)
      : cleanPhone.startsWith("0") && cleanPhone.length === 11
      ? cleanPhone.slice(1)
      : cleanPhone;

  if (!trimmedPhone) {
    errors.phone = "Contact phone number is required.";
  } else if (!/^[6-9]\d{9}$/.test(normalizedPhone)) {
    errors.phone = "Please enter a valid 10-digit mobile number (e.g., 9876543210).";
  }

  // Products of interest validation
  if (selectedProds.length === 0) {
    errors.products = "Please select at least one product of interest.";
  }

  // Message validation (Optional, but if filled must be reasonable length)
  const trimmedMessage = data.message.trim();
  if (trimmedMessage && trimmedMessage.length < 5) {
    errors.message = "Message must be at least 5 characters.";
  }

  return errors;
}

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmittedAttempted, setIsSubmittedAttempted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

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
    const nextProducts = selectedProducts.includes(name)
      ? selectedProducts.filter((p) => p !== name)
      : [...selectedProducts, name];
    setSelectedProducts(nextProducts);

    if (touched.products || isSubmittedAttempted) {
      const validationErrors = validateForm(formData, nextProducts);
      setErrors(validationErrors);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const updatedForm = { ...formData, [name]: value };
    setFormData(updatedForm);

    if (touched[name] || isSubmittedAttempted) {
      const validationErrors = validateForm(updatedForm, selectedProducts);
      setErrors(validationErrors);
    }
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const validationErrors = validateForm(formData, selectedProducts);
    setErrors(validationErrors);
  };

  const showError = (field: keyof FormErrors) => {
    return (touched[field] || isSubmittedAttempted) && errors[field];
  };

  const getInputClassName = (field: keyof FormErrors) => {
    const hasError = showError(field);
    return `w-full px-4 py-3 rounded-xl border transition-colors text-ink placeholder:text-slate/50 focus:outline-none ${
      hasError
        ? "border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-1 focus:ring-red-500"
        : "border-mist bg-white focus:border-signal-teal focus:ring-1 focus:ring-signal-teal"
    }`;
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
      `Products of Interest: ${selectedProducts.length > 0 ? selectedProducts.join(", ") : "General Enquiry"}\n\n` +
      `Message / Requirements:\n${formData.message || "None provided"}\n`
    );
    return `mailto:contact@amibapharmaceuticals.com?subject=${subject}&body=${body}`;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmittedAttempted(true);

    const validationErrors = validateForm(formData, selectedProducts);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      const firstErrorKey = Object.keys(validationErrors)[0];
      const element = document.getElementById(firstErrorKey);
      if (element) {
        element.focus();
      }
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    const payload = {
      "Company Name": formData.company_name,
      "Contact Person": formData.contact_person,
      "Email": formData.email,
      "Phone": formData.phone,
      "Drug License No": formData.drug_license.trim() || "Not provided",
      "GST No": formData.gst_number.trim() || "Not provided",
      "Products of Interest": selectedProducts.join(", "),
      "Message": formData.message.trim() || "No additional comments",
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
      <section className="pt-10 sm:pt-16 pb-16 sm:pb-24 bg-paper">
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
      <section className="pt-10 sm:pt-16 pb-16 sm:pb-24 bg-paper">
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
                <form onSubmit={handleSubmit} noValidate className="space-y-6">
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
                        value={formData.company_name}
                        onChange={handleInputChange}
                        onBlur={() => handleBlur("company_name")}
                        className={getInputClassName("company_name")}
                        placeholder="Your institution name"
                      />
                      {showError("company_name") && (
                        <p className="text-xs text-red-600 mt-1.5 flex items-center gap-1">
                          <AlertCircle size={13} className="flex-shrink-0" />
                          <span>{errors.company_name}</span>
                        </p>
                      )}
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
                        value={formData.contact_person}
                        onChange={handleInputChange}
                        onBlur={() => handleBlur("contact_person")}
                        className={getInputClassName("contact_person")}
                        placeholder="Full name"
                      />
                      {showError("contact_person") && (
                        <p className="text-xs text-red-600 mt-1.5 flex items-center gap-1">
                          <AlertCircle size={13} className="flex-shrink-0" />
                          <span>{errors.contact_person}</span>
                        </p>
                      )}
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
                        onBlur={() => handleBlur("drug_license")}
                        className={getInputClassName("drug_license")}
                        placeholder="e.g., XX-XXXXX"
                      />
                      {showError("drug_license") && (
                        <p className="text-xs text-red-600 mt-1.5 flex items-center gap-1">
                          <AlertCircle size={13} className="flex-shrink-0" />
                          <span>{errors.drug_license}</span>
                        </p>
                      )}
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
                        onBlur={() => handleBlur("gst_number")}
                        className={getInputClassName("gst_number")}
                        placeholder="e.g., 27XXXXXXXXX1Z5"
                      />
                      {showError("gst_number") && (
                        <p className="text-xs text-red-600 mt-1.5 flex items-center gap-1">
                          <AlertCircle size={13} className="flex-shrink-0" />
                          <span>{errors.gst_number}</span>
                        </p>
                      )}
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
                        value={formData.email}
                        onChange={handleInputChange}
                        onBlur={() => handleBlur("email")}
                        className={getInputClassName("email")}
                        placeholder="procurement@hospital.com"
                      />
                      {showError("email") && (
                        <p className="text-xs text-red-600 mt-1.5 flex items-center gap-1">
                          <AlertCircle size={13} className="flex-shrink-0" />
                          <span>{errors.email}</span>
                        </p>
                      )}
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
                        value={formData.phone}
                        onChange={handleInputChange}
                        onBlur={() => handleBlur("phone")}
                        className={getInputClassName("phone")}
                        placeholder="+91 98765 43210"
                      />
                      {showError("phone") && (
                        <p className="text-xs text-red-600 mt-1.5 flex items-center gap-1">
                          <AlertCircle size={13} className="flex-shrink-0" />
                          <span>{errors.phone}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Product Selection */}
                  <div id="products">
                    <label className="block text-sm font-medium text-ink mb-3">
                      Products of Interest *
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {products.map((p) => (
                        <button
                          key={p.slug}
                          type="button"
                          onClick={() => toggleProduct(p.name)}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                            selectedProducts.includes(p.name)
                              ? "bg-signal-teal text-white shadow-xs"
                              : "bg-mist/50 text-slate hover:bg-mist"
                          }`}
                        >
                          {p.name}
                        </button>
                      ))}
                    </div>
                    {showError("products") && (
                      <p className="text-xs text-red-600 mt-2 flex items-center gap-1">
                        <AlertCircle size={13} className="flex-shrink-0" />
                        <span>{errors.products}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-ink mb-2"
                    >
                      Message{" "}
                      <span className="text-slate/60 text-xs font-normal">
                        (Optional)
                      </span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      onBlur={() => handleBlur("message")}
                      className={getInputClassName("message")}
                      placeholder="Tell us about your requirements, estimated volumes, or any specific questions..."
                    />
                    {showError("message") && (
                      <p className="text-xs text-red-600 mt-1.5 flex items-center gap-1">
                        <AlertCircle size={13} className="flex-shrink-0" />
                        <span>{errors.message}</span>
                      </p>
                    )}
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
            <div className="lg:col-span-2">
              <SectionReveal>
                <div className="glass-card p-6 sm:p-8">
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
              </SectionReveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
