"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import emailjs from "emailjs-com"; 
import toast, { Toaster } from "react-hot-toast";
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Clock,
  Link as LinkIcon,
  Globe,
  Mail,
} from "lucide-react";
import { client } from "@/sanity/lib/client";

/* ==========================================================
   Utility: Format post date into readable format
========================================================== */
const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return dateString;
  }
};

/* ==========================================================
   Footer Component
========================================================== */
export default function Footer() {
  const [categories, setCategories] = useState([]);
  const [latestPosts, setLatestPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState("");


   /* ----------------------------------------------------------
     ✅ Send Email Function with Toast
  ---------------------------------------------------------- */
  const sendEmail = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter your email address!");
      return;
    }

    emailjs
      .send(
        "service_zhs7ptv", // your service ID
        "template_nugjhg9", // your template ID
        { user_email: email },
        "ZBaNV2kIfvCxXwHRu" // your public key
      )
      .then(
        () => {
          setEmail(""); 
          toast.success("🎉 Thank you for subscribing!");
        },
        (error) => {
          console.error("Email send error:", error);
          toast.error("❌ Something went wrong. Please try again.");
        }
      );
  };
  /* ----------------------------------------------------------
     Fetch categories and recent posts from Sanity CMS
  ---------------------------------------------------------- */
  useEffect(() => {
    let mounted = true;

    async function fetchData() {
      setIsLoading(true);
      try {
        const [categoryData, postsData] = await Promise.all([
          client.fetch(
            `*[_type == "category"] | order(_createdAt desc)[0...5]{
              title,
              "slug": slug.current
            }`
          ),
          client.fetch(
            `*[_type == "post"] | order(_createdAt desc)[0...3]{
              title,
              "slug": slug.current,
              _createdAt,
              mainImage { asset -> { url } }
            }`
          ),
        ]);

        if (mounted) {
          setCategories(categoryData);
          setLatestPosts(postsData);
        }
      } catch (error) {
        console.error("Error fetching footer data:", error);
      } finally {
        if (mounted) setIsLoading(false);
      }
    }

    fetchData();
    return () => {
      mounted = false;
    };
  }, []);

  /* ----------------------------------------------------------
     Styling Tokens
  ---------------------------------------------------------- */
  const accent = "text-amber-400";
  const text = "text-gray-400";
  const heading = "text-white";
  const border = "border-gray-800";
  const hover = "hover:text-amber-400";

  /* ----------------------------------------------------------
     Social Links
  ---------------------------------------------------------- */
  const socialLinks = [
    { icon: Twitter, href: "https://x.com/buzz_mega75418?s=08" },
    {
      icon: Instagram,
      href: "https://www.instagram.com/megashopbuzz/?igsh=b3R3OWtkcjE0NDdl#",
    },
    {
      icon: Facebook,
      href: "https://www.facebook.com/people/HSH-Clothing-Collection/61581361705853/",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/mega-shopbuzz-271b80395/",
    },
    {
      icon: Globe,
      href: "https://www.quora.com/profile/MegaShopBuzz?ch=3&oid=3124200263",
    },
  ];

  /* ==========================================================
     Render
  ========================================================== */
  return (
    <footer className={`bg-gray-950 border-t ${border} font-inter`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        {/* ------------------------------------------------------
           Top Section (Brand + Links + Categories + Posts)
        ------------------------------------------------------ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-y-12 gap-x-10 mb-12">
          {/* ========================== Brand & Newsletter ========================== */}
          <div className="lg:col-span-2">
            {/* Logo + Title */}
            <div className="flex items-center gap-3 mb-6">
              <Link
                href="/"
                className="flex items-center gap-3 group transition-all duration-300"
              >
                <Image
                  src="/logo.png"
                  alt="Mega Shop Buzz Logo"
                  width={56}
                  height={56}
                  className="rounded-xl object-cover border border-yellow-400/50 shadow-sm group-hover:scale-105 transition-transform duration-300"
                />
                <h3
                  className={`text-xl sm:text-2xl font-bold text-white group-hover:text-yellow-400 transition-colors`}
                >
                  <span className="text-white">Mega </span>
                  <span className="text-yellow-400 group-hover:text-yellow-300 transition-colors">
                    Shop
                  </span>{" "}
                  <span className="text-yellow-400/90">Buzz</span>
                </h3>
              </Link>
            </div>

            {/* About */}
            <p className={`mt-4 text-base ${text} max-w-md`}>
              Your go-to source for the latest trends, insightful reviews, and
              exclusive buzz across technology, lifestyle, and shopping.
            </p>

            {/* Social Icons */}
            <div className="mt-8">
              <h4
                className={`${heading} font-bold text-sm uppercase tracking-wider mb-3`}
              >
                Connect With Us
              </h4>
              <div className="flex gap-4 flex-wrap">
                {socialLinks.map(({ icon: Icon, href }, index) => (
                  <a
                    key={index}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2 rounded-full transition-all duration-300 ${text} bg-gray-800/50 ${hover} hover:bg-amber-600/20`}
                  >
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>

            {/* ========================== Newsletter Section ========================== */}
              {/* ✅ Newsletter Section */}
        <div className="mt-8">
          <h4
            className={`${heading} font-bold text-sm uppercase tracking-wider mb-3`}
          >
            Subscribe to Our Newsletter
          </h4>
          <form
            onSubmit={sendEmail}
            className="flex items-center bg-gray-900 rounded-full overflow-hidden max-w-md border border-gray-800 focus-within:border-amber-500 transition-all duration-300"
          >
            <Mail size={15} className="ml-4 text-amber-400" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-grow bg-transparent px-3 py-3 text-sm text-gray-300 outline-none"
            />
            <button
              type="submit"
              className="bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold px-5 py-3 rounded-r-full transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
          </div>

          {/* ========================== Quick Links ========================== */}
          <div>
            <h4
              className={`text-xl font-bold ${heading} mb-6 border-b border-amber-400/30 pb-2`}
            >
              Quick Links
            </h4>
            <ul className="space-y-3 text-base">
              {[
                { href: "/", label: "Home" },
                { href: "/all-blogs", label: "All Blogs" },
                { href: "/categories", label: "Categories" },
              ].map(({ href, label }, index) => (
                <li key={index}>
                  <Link
                    href={href}
                    className={`${text} ${hover} flex items-center gap-2`}
                  >
                    <LinkIcon size={16} className="text-amber-400" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ========================== Top Categories ========================== */}
          <div>
            <h4
              className={`text-xl font-bold ${heading} mb-6 border-b border-amber-400/30 pb-2`}
            >
              Top Categories
            </h4>
            {isLoading ? (
              <p className="text-gray-500 text-sm">Loading...</p>
            ) : categories.length ? (
              <ul className="space-y-3 text-base">
                {categories.map(({ slug, title }) => (
                  <li key={slug}>
                    <Link
                      href={`/categories/${slug}`}
                      className={`${text} ${hover} flex items-center gap-2 hover:translate-x-1 transition-transform`}
                    >
                      <span className="text-amber-400 font-extrabold">
                        &rarr;
                      </span>
                      {title}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600 text-base">No categories found.</p>
            )}
          </div>

          {/* ========================== Recent Posts ========================== */}
          <div>
            <h4
              className={`text-xl font-bold ${heading} mb-6 border-b border-amber-400/30 pb-2`}
            >
              Recent Posts
            </h4>
            {isLoading ? (
              <p className="text-gray-500 text-sm">Loading...</p>
            ) : latestPosts.length ? (
              <ul className="space-y-5">
                {latestPosts.map(({ slug, title, mainImage, _createdAt }) => (
                  <li key={slug}>
                    <Link
                      href={`/blog/${slug}`}
                      className="group flex gap-4 p-2 rounded-lg hover:bg-gray-800/70 transition-colors"
                    >
                      <div className="relative w-20 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={mainImage?.asset?.url || "/placeholder.svg"}
                          alt={title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500 rounded-lg"
                        />
                      </div>
                      <div className="flex flex-col justify-center">
                        <p
                          className={`text-sm font-semibold ${heading} line-clamp-2 group-hover:text-amber-400`}
                        >
                          {title}
                        </p>
                        <div
                          className={`flex items-center gap-1 ${text} text-xs mt-1`}
                        >
                          <Clock size={12} className="text-amber-500" />
                          {formatDate(_createdAt)}
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600 text-base">No recent posts found.</p>
            )}
          </div>
        </div>

        {/* ------------------------------------------------------
           Bottom Bar (Legal Links)
        ------------------------------------------------------ */}
         <div
          className={`border-t ${border} pt-8 mt-8 flex flex-col md:flex-row justify-between items-center text-sm ${text}`}
        >
          <p className="order-2 md:order-1 mt-4 md:mt-0 text-center">
            &copy; {new Date().getFullYear()} Mega Shop Buzz. All rights
            reserved.
            <span className="block md:inline md:ml-2">
              | Designed &amp; Developed by{" "}
              <a
                href="https://www.linkedin.com/in/yasirweb/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-400 hover:text-amber-300 font-semibold underline underline-offset-4 decoration-amber-400/70 transition-colors"
              >
                Yasir Dev
              </a>
            </span>
          </p>

          <div className="flex gap-6 order-1 md:order-2">
            <Link href="/privacy-policy" className={`${text} ${hover}`}>
              Privacy Policy
            </Link>
            <Link href="/terms-and-conditions" className={`${text} ${hover}`}>
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
      {/* Toast Container */}
      <Toaster position="top-center" reverseOrder={false} />
    </footer>
  );
}
