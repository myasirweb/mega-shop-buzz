"use client";

import React from "react";
import { Gavel, Users, FileText, AlertTriangle, ExternalLink, CheckCircle, Ban, Copyright, Mail, XCircle, RotateCw } from "lucide-react";

const TermsAndConditions = () => {
  const accentColor = "text-amber-400";
  const textColor = "text-gray-300";
  const headingColor = "text-white";
  const sectionDivider = "border-b border-amber-400/30 pb-2 mb-4";
  const mainBg = "bg-gray-950"; // Dark background
  const containerBg = "bg-gray-900"; // Slightly lighter container background
  
  // Style for the main term headings
  const termHeadingStyle = `text-2xl font-bold ${headingColor} flex items-center gap-3 ${sectionDivider}`;
  const sectionContainerStyle = "mb-10 p-6 rounded-xl bg-gray-800/50 border border-gray-800 hover:border-amber-500/30 transition-all duration-300";

  return (
    <div className={`min-h-screen py-16 px-6 ${mainBg} font-inter`}>
      <div className={`max-w-4xl mx-auto p-8 sm:p-12 rounded-3xl shadow-2xl ${containerBg} border border-amber-400/20`}>
        
        {/* === Header Section === */}
        <div className="text-center mb-12">
            <Gavel size={64} className={`mx-auto mb-4 ${accentColor}`} strokeWidth={1.5} />
            <h1 className={`text-4xl sm:text-5xl font-extrabold mb-4 ${headingColor} tracking-tight`}>
                Terms and <span className={accentColor}>Conditions</span>
            </h1>
            <p className={`mb-8 text-lg sm:text-xl max-w-2xl mx-auto ${textColor}`}>
                Welcome to <strong className="text-amber-200">Mega Shop Buzz</strong>. By accessing or
                using our platform, you agree to comply with and be bound by the
                following terms. Please review them carefully.
            </p>
        </div>


        {/* === Content Sections (Terms) === */}

        {/* 1. Age Requirement */}
        <section className={sectionContainerStyle}>
          <h2 className={termHeadingStyle}>
            <Users size={24} className={accentColor} /> 1. Age Requirement
          </h2>
          <p className="text-lg leading-relaxed text-gray-400">
            Users must be at least <strong className="text-amber-200">13 years old</strong> to access and use
            the Mega Shop Buzz website. By using the site, you confirm you meet this age requirement.
          </p>
        </section>

        {/* 2. Content Purpose and Modification */}
        <section className={sectionContainerStyle}>
          <h2 className={termHeadingStyle}>
            <FileText size={24} className={accentColor} /> 2. Content and Information Use
          </h2>
          <p className="text-lg leading-relaxed text-gray-400">
            All content published on <strong className="text-amber-200">Mega Shop Buzz</strong> is for
            informational and promotional purposes only. Content may be modified or
            updated at any time without prior notice to improve accuracy and relevance.
          </p>
        </section>

        {/* 3. Deal Accuracy Disclaimer */}
        <section className={sectionContainerStyle}>
          <h2 className={termHeadingStyle}>
            <AlertTriangle size={24} className={accentColor} /> 3. Deal Accuracy Disclaimer
          </h2>
          <p className="text-lg leading-relaxed text-gray-400">
            We do not guarantee the accuracy, availability, or validity of any
            deals, offers, discounts, or affiliate promotions listed on our site. Prices and availability are subject to change by the third-party merchants.
          </p>
        </section>

        {/* 4. Third-Party/Affiliate Responsibility */}
        <section className={sectionContainerStyle}>
          <h2 className={termHeadingStyle}>
            <ExternalLink size={24} className={accentColor} /> 4. Third-Party Liability
          </h2>
          <p className="text-lg leading-relaxed text-gray-400">
            <strong className="text-amber-200">Mega Shop Buzz</strong> is not responsible for any purchases,
            transactions, or activities conducted on external third-party or affiliate
            websites linked through our content. These sites have separate terms and policies.
          </p>
        </section>

        {/* 5. User Purchase Verification */}
        <section className={sectionContainerStyle}>
          <h2 className={termHeadingStyle}>
            <CheckCircle size={24} className={accentColor} /> 5. User Verification Responsibility
          </h2>
          <p className="text-lg leading-relaxed text-gray-400">
            Users are solely responsible for verifying all discounts, coupon
            codes, and product details directly with the retailer before completing any purchase or transaction.
          </p>
        </section>

        {/* 6. Prohibited Activities */}
        <section className={sectionContainerStyle}>
          <h2 className={termHeadingStyle}>
            <Ban size={24} className={accentColor} /> 6. Prohibited Activities
          </h2>
          <p className="text-lg leading-relaxed text-gray-400">
            Unauthorized activities such as content scraping, data mining, or the
            use of automated bots to access our website are strictly prohibited and may result in immediate termination of access.
          </p>
        </section>

        {/* 7. Intellectual Property */}
        <section className={sectionContainerStyle}>
          <h2 className={termHeadingStyle}>
            <Copyright size={24} className={accentColor} /> 7. Intellectual Property Rights
          </h2>
          <p className="text-lg leading-relaxed text-gray-400">
            Users may not copy, reproduce, or distribute any portion of our
            website’s unique content, logos, or materials without prior written
            permission from <strong className="text-amber-200">Mega Shop Buzz</strong>.
          </p>
        </section>

        {/* 8. Subscription Agreement */}
        <section className={sectionContainerStyle}>
          <h2 className={termHeadingStyle}>
            <Mail size={24} className={accentColor} /> 8. Subscription Agreement
          </h2>
          <p className="text-lg leading-relaxed text-gray-400">
            By subscribing to our newsletter or promotional updates, you agree to
            receive periodic marketing emails from <strong className="text-amber-200">Mega Shop Buzz</strong>.
            You may easily unsubscribe at any time using the link provided in every email communication.
          </p>
        </section>
        
        {/* 9. Termination of Access */}
        <section className={sectionContainerStyle}>
          <h2 className={termHeadingStyle}>
            <XCircle size={24} className={accentColor} /> 9. Termination of Access
          </h2>
          <p className="text-lg leading-relaxed text-gray-400">
            We reserve the right to suspend, restrict, or terminate access to any
            user who violates these Terms and Conditions or engages in harmful or
            unauthorized activity on our platform.
          </p>
        </section>

        {/* 10. Terms Updates */}
        <section className={sectionContainerStyle}>
          <h2 className={termHeadingStyle}>
            <RotateCw size={24} className={accentColor} /> 10. Updates to Terms
          </h2>
          <p className="text-lg leading-relaxed text-gray-400">
            These Terms and Conditions may be revised or updated at any time.
            Continued use of our website after such updates constitutes your
            acceptance of the new terms.
          </p>
        </section>

        {/* === Conclusion === */}
        <p className={`mt-12 text-center text-xl font-semibold ${textColor}`}>
          By using <strong className="text-amber-200">Mega Shop Buzz</strong>, you acknowledge that you have read,
          understood, and agreed to these Terms and Conditions. Thank you for
          being a part of our community!
        </p>

      </div>
    </div>
  );
};

export default TermsAndConditions;