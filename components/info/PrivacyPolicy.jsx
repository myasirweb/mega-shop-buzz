"use client";

import React from "react";
import { Shield, Info, Cookie, Link, Lock, Users, Clock, Mail } from "lucide-react";

// The design is updated to match the dark theme and amber accent 
// used across the Header and FeaturedSection components.

const PrivacyPolicy = () => {
  const accentColor = "text-amber-400";
  const textColor = "text-gray-300";
  const headingColor = "text-white";
  const sectionDivider = "border-b border-amber-400/30 pb-2 mb-4";
  const mainBg = "bg-gray-950"; // Dark background
  const containerBg = "bg-gray-900"; // Slightly lighter container background

  // Inline styles for list items to make them visually distinct
  const listItemStyle = `flex items-start gap-3 ${textColor} text-base`;
  
  return (
    <div className={`min-h-screen py-16 px-6 ${mainBg} font-inter`}>
      <div className={`max-w-4xl mx-auto p-8 sm:p-12 rounded-3xl shadow-2xl ${containerBg} border border-amber-400/20`}>
        
        {/* === Header Section === */}
        <div className="text-center mb-12">
            <Shield size={64} className={`mx-auto mb-4 ${accentColor}`} strokeWidth={1.5} />
            <h1 className={`text-4xl sm:text-5xl font-extrabold mb-4 ${headingColor} tracking-tight`}>
                Privacy <span className={accentColor}>Policy</span>
            </h1>
            <p className={`mb-8 text-lg sm:text-xl max-w-2xl mx-auto ${textColor}`}>
                Welcome to <strong className="text-amber-200">Mega Shop Buzz</strong> — your trusted destination for
                exclusive deals and product reviews. Your privacy is paramount, and we’re committed to full transparency.
            </p>
        </div>


        {/* === Content Sections === */}

        {/* 1. Information We Collect */}
        <section className="mb-10 p-6 rounded-xl bg-gray-800/50">
          <h2 className={`text-3xl font-bold mt-4 mb-5 ${headingColor} flex items-center gap-3 ${sectionDivider}`}>
            <Info size={28} className={accentColor} /> 1. Information We Collect
          </h2>

          <h3 className={`text-xl font-semibold mt-4 mb-3 ${accentColor}`}>Personal Information</h3>
          <p className="mb-4 text-base leading-relaxed text-gray-400">
            We may collect personal details such as your name, email address, and preferences when you interact with our site, typically through:
          </p>
          <ul className="space-y-3 mb-6">
            <li className={listItemStyle}><span className="text-amber-400 font-extrabold">&bull;</span> Subscribing to our newsletter</li>
            <li className={listItemStyle}><span className="text-amber-400 font-extrabold">&bull;</span> Submitting a contact form or inquiry</li>
            <li className={listItemStyle}><span className="text-amber-400 font-extrabold">&bull;</span> Leaving a comment on a blog post</li>
          </ul>

          <h3 className={`text-xl font-semibold mt-4 mb-3 ${accentColor}`}>Non-Personal Information</h3>
          <p className="mb-4 text-base leading-relaxed text-gray-400">
            We also collect anonymous data to improve user experience, which includes device information, IP address (general location), and website navigation patterns. This information is typically analyzed through third-party tools like Google Analytics.
          </p>
        </section>

        {/* 2. How We Use Your Information */}
        <section className="mb-10 p-6 rounded-xl bg-gray-800/50">
          <h2 className={`text-3xl font-bold mt-4 mb-5 ${headingColor} flex items-center gap-3 ${sectionDivider}`}>
            <Lock size={28} className={accentColor} /> 2. How We Use Your Information
          </h2>
          <p className="mb-4 text-base leading-relaxed text-gray-400">
            Your data is used solely to enhance your experience on <strong className="text-amber-200">Mega Shop Buzz</strong>. We may use it to:
          </p>
          <ul className="space-y-3 mb-6">
            <li className={listItemStyle}><span className="text-amber-400 font-extrabold">&bull;</span> Send personalized newsletters and promotional content (only with your explicit consent).</li>
            <li className={listItemStyle}><span className="text-amber-400 font-extrabold">&bull;</span> Notify you about new blog posts or exclusive offers.</li>
            <li className={listItemStyle}><span className="text-amber-400 font-extrabold">&bull;</span> Improve website design and product recommendations based on aggregated preferences.</li>
          </ul>
          <p className="text-lg font-medium text-amber-200 mt-4">
            We **never** sell or rent your personal data to third parties.
          </p>
        </section>

        {/* 3. Use of Cookies */}
        <section className="mb-10 p-6 rounded-xl bg-gray-800/50">
          <h2 className={`text-3xl font-bold mt-4 mb-5 ${headingColor} flex items-center gap-3 ${sectionDivider}`}>
            <Cookie size={28} className={accentColor} /> 3. Use of Cookies
          </h2>
          <p className="mb-4 text-base leading-relaxed text-gray-400">
            <strong className="text-amber-200">Mega Shop Buzz</strong> uses cookies to enhance your browsing experience. These small files help us:
          </p>
          <ul className="space-y-3 mb-6">
            <li className={listItemStyle}><span className="text-amber-400 font-extrabold">&bull;</span> Remember user preferences and settings for a smoother visit.</li>
            <li className={listItemStyle}><span className="text-amber-400 font-extrabold">&bull;</span> Understand visitor content interaction and traffic patterns.</li>
            <li className={listItemStyle}><span className="text-amber-400 font-extrabold">&bull;</span> Show relevant product deals, which often involves affiliate tracking cookies.</li>
          </ul>
          <p className="text-sm text-gray-500 italic mt-4">
            You maintain full control and can disable cookies in your browser settings, though this may affect some site functionality.
          </p>
        </section>

        {/* 4. Third-Party Links & Affiliate Partners */}
        <section className="mb-10 p-6 rounded-xl bg-gray-800/50">
          <h2 className={`text-3xl font-bold mt-4 mb-5 ${headingColor} flex items-center gap-3 ${sectionDivider}`}>
            <Link size={28} className={accentColor} /> 4. Third-Party Links & Affiliate Partners
          </h2>
          <p className="mb-4 text-base leading-relaxed text-gray-400">
            Our content frequently includes affiliate links leading to third-party websites. These external partners operate independently and maintain their own distinct privacy policies. We strongly recommend reviewing their policies as we cannot be responsible for their data practices.
          </p>
        </section>

        {/* 5. Data Security */}
        <section className="mb-10 p-6 rounded-xl bg-gray-800/50">
          <h2 className={`text-3xl font-bold mt-4 mb-5 ${headingColor} flex items-center gap-3 ${sectionDivider}`}>
            <Lock size={28} className={accentColor} /> 5. Data Security
          </h2>
          <p className="text-base leading-relaxed text-gray-400">
            We adhere to industry-standard security measures to safeguard your information against unauthorized access, loss, or misuse. While absolute security cannot be guaranteed over the internet, we continuously update our practices to provide maximum protection for our users.
          </p>
        </section>

        {/* 6. Children’s Privacy */}
        <section className="mb-10 p-6 rounded-xl bg-gray-800/50">
          <h2 className={`text-3xl font-bold mt-4 mb-5 ${headingColor} flex items-center gap-3 ${sectionDivider}`}>
            <Users size={28} className={accentColor} /> 6. Children’s Privacy
          </h2>
          <p className="text-base leading-relaxed text-gray-400">
            <strong className="text-amber-200">Mega Shop Buzz</strong> is designed for audiences 13 years of age and older. We do not knowingly collect personal data from children. If we become aware of any such data, we will take immediate steps to delete it.
          </p>
        </section>

        {/* 7. Policy Updates */}
        <section className="mb-10 p-6 rounded-xl bg-gray-800/50">
          <h2 className={`text-3xl font-bold mt-4 mb-5 ${headingColor} flex items-center gap-3 ${sectionDivider}`}>
            <Clock size={28} className={accentColor} /> 7. Policy Updates
          </h2>
          <p className="text-base leading-relaxed text-gray-400">
            This Privacy Policy may be revised periodically to incorporate new features or necessary regulatory updates. Any changes will be posted on this page, and the continued use of the site following these updates implies your acceptance of the latest terms.
          </p>
        </section>

        {/* 8. Contact Us */}
        <section className="p-6 rounded-xl bg-gray-800/50">
          <h2 className={`text-3xl font-bold mt-4 mb-5 ${headingColor} flex items-center gap-3 ${sectionDivider}`}>
            <Mail size={28} className={accentColor} /> 9. Contact Us
          </h2>
          <p className="text-base leading-relaxed text-gray-400">
            For any concerns, clarifications, or requests related to this Privacy Policy, please feel free to reach out via our designated contact channels. Our team is dedicated to ensuring your experience with <strong className="text-amber-200">Mega Shop Buzz</strong> remains secure and transparent.
          </p>
        </section>

      </div>
    </div>
  );
};

export default PrivacyPolicy;