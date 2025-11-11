"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Globe,
} from "lucide-react";

/* ==========================================================
   Loader (on route change)
========================================================== */
const Loader = () => (
  <div className="fixed inset-0 bg-black/40 z-[100] flex items-center justify-center">
    <div className="w-8 h-8 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

/* ==========================================================
   Header Component
========================================================== */
export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  /* ===== Page Transition Loader ===== */
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, [pathname]);

  /* ===== Theme Variables ===== */
  const headerBg = "bg-[#060b18]"; // darker navy for premium feel
  const borderColor = "border-[#1c2234]";
  const textColor = "text-white";
  const accent = "text-yellow-400";

  /* ===== Navigation Links ===== */
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/categories", label: "All Categories" },
    { href: "/all-blogs", label: "All Blogs" },
  ];

  /* ===== Social Links ===== */
  const socialLinks = [
    {
      icon: Twitter,
      href: "https://x.com/buzz_mega75418?s=08",
      label: "Twitter",
    },
    {
      icon: Instagram,
      href: "https://www.instagram.com/megashopbuzz/?igsh=b3R3OWtkcjE0NDdl#",
      label: "Instagram",
    },
    {
      icon: Facebook,
      href: "https://www.facebook.com/people/HSH-Clothing-Collection/61581361705853/?rdid=J7gSsgtrbY2Tho7B",
      label: "Facebook",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/mega-shopbuzz-271b80395/",
      label: "LinkedIn",
    },
    {
      icon: Globe,
      href: "https://www.quora.com/profile/MegaShopBuzz?ch=3&oid=3124200263",
      label: "Quora",
    },
  ];

  /* ===== Active Link Styling ===== */
  const getLinkClass = (href) => {
    const isActive =
      pathname === href || (href !== "/" && pathname.startsWith(href));
    return `font-medium text-[15px] tracking-wide transition-colors duration-200 ${
      isActive
        ? "text-yellow-400 border-b-[2px] border-yellow-400 pb-[2px]"
        : `${textColor} hover:text-yellow-400`
    }`;
  };

  return (
    <>
      {loading && <Loader />}

      <header
        className={`sticky top-0 z-50 ${headerBg} border-b ${borderColor} shadow-sm`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-[72px]">
            {/* === Logo Section === */}
            <Link
              href="/"
              className="flex items-center gap-2 group transition-all duration-200"
            >
              <Image
                src="/logo.png"
                alt="Mega Shop Buzz Logo"
                width={44}
                height={44}
                priority
                className="rounded-full border border-yellow-400/40 shadow-sm group-hover:scale-[1.05] transition-transform"
              />
              <span className="font-bold text-lg sm:text-xl tracking-tight leading-none text-white">
                Mega{" "}
                <span className={`${accent} group-hover:text-yellow-300`}>
                  Shop
                </span>{" "}
                <span className="text-yellow-400/90">Buzz</span>
              </span>
            </Link>

            {/* === Desktop Nav === */}
            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map(({ href, label }) => (
                <Link key={href} href={href} className={getLinkClass(href)}>
                  {label}
                </Link>
              ))}
            </nav>

            {/* === Socials + Mobile Menu Button === */}
            <div className="flex items-center gap-3">
              {/* Desktop Socials */}
              <div className="hidden lg:flex items-center gap-2">
                {socialLinks.map(({ icon: Icon, href, label }, i) => (
                  <a
                    key={i}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="p-2 text-white/80 hover:text-yellow-400 transition-colors"
                  >
                    <Icon size={17} />
                  </a>
                ))}
              </div>

              {/* Mobile Toggle */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle Menu"
                className="md:hidden text-white/90 hover:text-yellow-400"
              >
                {isOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>

          {/* === Mobile Menu === */}
          <nav
            className={`md:hidden transition-all duration-300 overflow-hidden ${headerBg} border-t ${borderColor} ${
              isOpen ? "max-h-80 py-4" : "max-h-0"
            }`}
          >
            <div className="flex flex-col gap-3 px-6 pb-3">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setIsOpen(false)}
                  className={getLinkClass(href)}
                >
                  {label}
                </Link>
              ))}
            </div>

            <div
              className={`border-t ${borderColor} mt-3 pt-4 flex justify-center flex-wrap gap-3`}
            >
              {socialLinks.map(({ icon: Icon, href, label }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-2 text-white/80 hover:text-yellow-400 transition-colors"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
