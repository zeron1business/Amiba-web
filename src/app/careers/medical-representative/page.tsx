import type { Metadata } from "next";
import { ArrowRight, MapPin, Briefcase, GraduationCap, Clock } from "lucide-react";
import { SectionReveal } from "@/components/shared/section-reveal";

export const metadata: Metadata = {
  title: "Medical Representative - Careers",
  description: "Join AMIBA Healthcare as a Medical Representative. We are hiring passionate individuals to build relationships and grow with us.",
};

export default function JobDescriptionPage() {
  return (
    <div className="pt-24 sm:pt-32 pb-16 sm:pb-24 bg-paper min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          {/* Breadcrumb / Back */}
          <div className="mb-8">
            <a href="/" className="text-sm font-medium text-signal-teal hover:underline flex items-center gap-1">
              &larr; Back to Home
            </a>
          </div>

          {/* Header */}
          <div className="mb-12">
            <h1 className="text-display-lg text-ink mb-4">Medical Representative</h1>
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-slate">
              <span className="flex items-center gap-1.5 bg-mist/30 px-3 py-1.5 rounded-full">
                <MapPin size={16} className="text-signal-teal" /> Multiple Locations
              </span>
              <span className="flex items-center gap-1.5 bg-mist/30 px-3 py-1.5 rounded-full">
                <Briefcase size={16} className="text-signal-teal" /> Full-time
              </span>
              <span className="flex items-center gap-1.5 bg-mist/30 px-3 py-1.5 rounded-full">
                <Clock size={16} className="text-signal-teal" /> Immediate Joiner
              </span>
            </div>
          </div>

          <hr className="border-mist/50 mb-12" />

          {/* Job Details */}
          <div className="prose-amiba space-y-10">
            <div>
              <h2 className="text-display-md !text-xl text-ink mb-3">About the Role</h2>
              <p className="text-body text-slate leading-relaxed">
                As a Medical Representative at AMIBA Pharmaceuticals, you will be the face of our company to healthcare professionals. This is not just a sales role; it is a relationship-building opportunity. Like our founders, you will be traveling, meeting doctors, detailing products, and building the trust that forms the foundation of our business. If you have the determination to face challenges and the drive to build something meaningful, we want you on our team.
              </p>
            </div>

            <div>
              <h2 className="text-display-md !text-xl text-ink mb-3">Key Responsibilities</h2>
              <ul className="list-disc pl-5 space-y-2 text-body text-slate">
                <li>Schedule and conduct meetings with doctors, pharmacists, and healthcare professionals to detail pharmaceutical products.</li>
                <li>Build and maintain strong, long-term relationships with key stakeholders in your assigned territory.</li>
                <li>Achieve monthly and quarterly sales targets by driving prescriptions and product visibility.</li>
                <li>Maintain accurate daily reports of meetings, feedback, and sales activities.</li>
                <li>Stay updated on product knowledge, clinical data, and market trends to effectively answer medical queries.</li>
                <li>Coordinate with distributors and stockists to ensure product availability in local pharmacies.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-display-md !text-xl text-ink mb-3">Requirements</h2>
              <ul className="list-disc pl-5 space-y-2 text-body text-slate">
                <li className="flex items-start gap-2">
                  <GraduationCap size={20} className="text-signal-teal shrink-0 mt-0.5" />
                  <span><strong>Education:</strong> B.Pharm, B.Sc, or equivalent degree preferred.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Briefcase size={20} className="text-signal-teal shrink-0 mt-0.5" />
                  <span><strong>Experience:</strong> 1-3 years of experience in pharmaceutical sales is preferred, but fresh graduates with strong potential are welcome to apply.</span>
                </li>
                <li>Excellent communication and interpersonal skills.</li>
                <li>Strong negotiation and persuasion abilities.</li>
                <li>Willingness to travel extensively within the assigned territory.</li>
                <li>Self-motivated with a strong drive to achieve and exceed targets.</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 sm:p-10 text-center mt-16 shadow-xs border border-mist">
              <h2 className="text-2xl font-bold text-ink font-[var(--font-display)] mb-3">Ready to Join Our Journey?</h2>
              <p className="text-slate mb-8 max-w-lg mx-auto leading-relaxed">
                Fill out our application form with your details and upload your resume. We'll be in touch with shortlisted candidates.
              </p>
              
              <a 
                href="https://docs.google.com/forms/d/e/1FAIpQLSee0R27KoByxJNLk0Ctaup7oW61T4gOJ3pXY1d3nL1GeYjwOA/viewform?usp=publish-editor" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-signal-teal text-white font-medium rounded-full px-8 py-3.5 hover:bg-signal-teal/90 transition-all gap-2 hover:-translate-y-0.5 active:translate-y-0"
              >
                Apply via Google Form
                <ArrowRight size={18} />
              </a>
              <p className="text-sm text-slate/70 mt-4">Takes about 3 minutes to complete.</p>
            </div>
          </div>
        </SectionReveal>
      </div>
    </div>
  );
}
