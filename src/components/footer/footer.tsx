import Link from "next/link";
import Image from "next/image";
import { footerNav } from "@/data/navigation";
import {
  Phone,
  Mail,
  MapPin,
  Shield,
  Globe,
  Award,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-clinical-navy text-white relative overflow-hidden">
      {/* Grain overlay */}
      <div className="grain-overlay absolute inset-0 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-8">
        {/* Main footer grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-8 sm:mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="relative w-56 sm:w-72 h-14 sm:h-18">
                <Image
                  src="/images/logo_light.png"
                  alt="AMIBA Pharmaceuticals"
                  fill
                  className="object-contain object-left"
                />
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Trusted B2B pharmaceutical and medical supply partner for
              hospitals, pharmacies, and healthcare institutions across India.
            </p>
            <div className="flex gap-3">
              {[Shield, Globe, Award].map((Icon, i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center"
                >
                  <Icon size={16} className="text-signal-teal" />
                </div>
              ))}
            </div>
          </div>

          {/* Products Column */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/40 mb-4">
              Products
            </h3>
            <ul className="space-y-3">
              {footerNav.products.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-signal-teal transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/40 mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              {footerNav.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-signal-teal transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              {footerNav.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-signal-teal transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/40 mb-4">
              Contact
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-signal-teal mt-0.5 flex-shrink-0" />
                <span className="text-sm text-white/60">
                  AMIBA PHARMACEUTICALS
                  <br />
                  H.O. : 202/204 Lalji Donger Shee Building, 3rd Floor Room No. 28,
                  <br />
                  Norsinatha Street, Bath Bazar, Mumbai-400009
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-signal-teal flex-shrink-0" />
                <a
                  href="tel:+917407685123"
                  className="text-sm text-white/60 hover:text-signal-teal transition-colors"
                >
                  7407685123 / 8617396557 / 8131078158
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-signal-teal flex-shrink-0" />
                <a
                  href="mailto:contact@amibapharmaceuticals.com"
                  className="text-sm text-white/60 hover:text-signal-teal transition-colors"
                >
                  contact@amibapharmaceuticals.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/40">
              © {new Date().getFullYear()} AMIBA PHARMACEUTICALS. All rights
              reserved. Licensed pharmaceutical wholesaler.
            </p>
            <p className="text-xs text-white/30">
              Drug License No: WB/JPG/BIO/NBO/W/788339
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
