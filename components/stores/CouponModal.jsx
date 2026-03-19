"use client";

import { useState, useEffect } from "react";
import { X, Scissors, ExternalLink } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";

export default function CouponModal({ coupon, storeLogo, storeName, affiliateLink, onClose }) {
  const [copied, setCopied] = useState(false);

  /* Close on Escape */
  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  function handleCopy() {
    if (!coupon.code) return;
    navigator.clipboard.writeText(coupon.code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  const logoUrl = storeLogo
    ? urlFor(storeLogo).width(64).height(64).fit("crop").url()
    : null;

  const isDeal = coupon.type === "Deal" || !coupon.code;

  return (
    /* Dark overlay */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
      onClick={onClose}
    >
      {/* Modal box */}
      <div
        className="relative bg-[#1e293b] border border-gray-700 rounded-2xl shadow-2xl w-full max-w-[480px] p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-300 transition-colors duration-200"
          aria-label="Close modal"
        >
          <X size={22} />
        </button>

        {/* Top row: logo + store name + coupon title */}
        <div className="flex items-center gap-3 mb-4 pr-8">
          {logoUrl ? (
            <div className="w-12 h-12 rounded-xl flex items-center justify-center overflow-hidden border border-white/30 shrink-0">
              <img src={logoUrl} alt={storeName} className="w-full h-full object-contain" />
            </div>
          ) : (
            <div className="w-12 h-12 rounded-xl bg-yellow-400 flex items-center justify-center shrink-0">
              <span className="text-black font-bold text-lg">
                {storeName?.charAt(0)?.toUpperCase() || "S"}
              </span>
            </div>
          )}
          <div className="min-w-0">
            <p className="text-xs text-gray-400 font-medium truncate">{storeName}</p>
            <h2 className="text-base font-bold text-white leading-snug line-clamp-2">
              {coupon.title}
            </h2>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-700 mb-4" />

        {/* Description */}
        {coupon.description && (
          <p className="text-sm text-gray-400 mb-4">{coupon.description}</p>
        )}

        {/* Discount badge */}
        {coupon.discount && (
          <div className="mb-4">
            <span className="bg-yellow-400/20 text-yellow-400 border border-yellow-400/30 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
              {coupon.discount}
            </span>
          </div>
        )}

        {/* Code box or Deal message */}
        {!isDeal ? (
          <>
            <div className="flex items-stretch border-2 border-dashed border-yellow-400/50 rounded-xl overflow-hidden mb-4">
              {/* Scissors icon */}
              <div className="bg-yellow-400/20 flex items-center justify-center px-3 py-4 shrink-0">
                <Scissors size={18} className="text-yellow-400 rotate-90" />
              </div>

              {/* Code text */}
              <div className="flex-1 px-4 flex items-center justify-center">
                <span className="font-mono font-bold text-xl tracking-widest text-white select-all">
                  {coupon.code}
                </span>
              </div>

              {/* Copy button */}
              <button
                onClick={handleCopy}
                className={`font-semibold text-sm px-4 py-4 shrink-0 transition-all duration-200 ${
                  copied
                    ? "bg-green-500 text-white"
                    : "bg-yellow-400 hover:bg-yellow-300 text-black"
                }`}
              >
                {copied ? "Copied! ✓" : "Copy Code"}
              </button>
            </div>

            <p className="text-center text-xs text-gray-500">
              Click Copy Code then paste at checkout
            </p>
          </>
        ) : (
          /* Deal — no code needed */
          <div className="text-center space-y-4 py-2">
            <p className="text-sm text-gray-400">
              No code needed — click below to activate deal
            </p>
            <a
              href={affiliateLink || "#"}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-black font-semibold text-sm px-6 py-3 rounded-xl transition-all duration-300"
            >
              Get Deal <ExternalLink size={14} />
            </a>
          </div>
        )}

        {/* Expiry date */}
        {coupon.expiryDate && (
          <p className="mt-4 text-xs text-center text-gray-500">
            Expires:{" "}
            {new Date(coupon.expiryDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
        )}
      </div>
    </div>
  );
}
