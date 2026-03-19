"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Users, CheckCircle, ExternalLink, ChevronRight } from "lucide-react";
import { client } from "@/sanity/lib/client";
import { storeBySlugQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import CouponModal from "./CouponModal";

/* ── Star rating ──────────────────────────────────────────────────────── */
function StarRating({ rating = 5, size = "md" }) {
  const sz = size === "sm" ? "w-4 h-4" : "w-5 h-5";
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`${sz} ${i < Math.round(rating) ? "text-yellow-400" : "text-gray-700"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

/* ── Coupon card ──────────────────────────────────────────────────────── */
function CouponCard({ coupon, storeLogo, storeName, affiliateLink }) {
  const [modalOpen, setModalOpen] = useState(false);

  const logoUrl = storeLogo
    ? urlFor(storeLogo).width(64).height(64).fit("crop").url()
    : null;

  function handleGetDeal() {
    if (affiliateLink) window.open(affiliateLink, "_blank", "noopener,noreferrer");
  }

  return (
    <>
      <div className="bg-gray-900 border border-gray-800 rounded-2xl hover:shadow-xl hover:shadow-yellow-400/5 hover:-translate-y-0.5 transition-all duration-300 flex items-stretch overflow-hidden">

        {/* Left: store logo thumbnail */}
        <div className="flex items-center justify-center w-24 shrink-0 border-r border-white/30 overflow-hidden">
          {logoUrl ? (
            <img src={logoUrl} alt={storeName} className="w-full h-full object-contain" />
          ) : (
            <div className="w-14 h-14 rounded-full bg-yellow-400 flex items-center justify-center text-black font-bold text-lg">
              {storeName?.charAt(0)?.toUpperCase() || "S"}
            </div>
          )}
        </div>

        {/* Middle: coupon info */}
        <div className="flex-1 px-4 py-4 flex flex-col justify-between gap-1.5 min-w-0">
          {/* Title */}
          <h3 className="font-bold text-white text-sm leading-snug line-clamp-2">
            {coupon.title}
          </h3>

          {/* Description */}
          {coupon.description && (
            <p className="text-xs text-gray-400 line-clamp-1">{coupon.description}</p>
          )}

          {/* Tags row */}
          <div className="flex items-center gap-2 mt-0.5 flex-wrap">
            {coupon.discount && (
              <span className="bg-yellow-400/20 text-yellow-400 border border-yellow-400/30 text-xs font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
                {coupon.discount}
              </span>
            )}
            {coupon.type && (
              <span
                className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${
                  coupon.type === "Code"
                    ? "bg-blue-900/50 text-blue-300 border-blue-700/50"
                    : "bg-purple-900/50 text-purple-300 border-purple-700/50"
                }`}
              >
                {coupon.type}
              </span>
            )}
            {coupon.isVerified && (
              <span className="flex items-center gap-1 text-xs font-semibold text-green-400 bg-green-900/40 border border-green-700/50 px-2 py-0.5 rounded-full">
                <CheckCircle size={10} />
                Verified
              </span>
            )}
            {coupon.usedCount > 0 && (
              <span className="flex items-center gap-1 text-xs text-gray-500">
                <Users size={11} />
                {coupon.usedCount} People Used
              </span>
            )}
          </div>
        </div>

        {/* Right: action button */}
        <div className="flex items-center justify-center px-4 shrink-0 border-l border-gray-800">
          {coupon.type === "Deal" ? (
            <button
              onClick={handleGetDeal}
              className="flex items-center gap-1.5 border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black font-semibold text-sm px-4 py-2.5 rounded-xl transition-all duration-300 whitespace-nowrap"
            >
              Get Deal <ExternalLink size={13} />
            </button>
          ) : (
            <button
              onClick={() => setModalOpen(true)}
              className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold text-sm px-4 py-2.5 rounded-xl transition-all duration-300 whitespace-nowrap"
            >
              Get Code
            </button>
          )}
        </div>
      </div>

      {modalOpen && (
        <CouponModal
          coupon={coupon}
          storeLogo={storeLogo}
          storeName={storeName}
          affiliateLink={affiliateLink}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
}

/* ── Main component ───────────────────────────────────────────────────── */
export default function StoreDetail({ slug }) {
  const [store, setStore] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    client
      .fetch(storeBySlugQuery, { slug })
      .then((data) => setStore(data || null))
      .catch((err) => console.error("Store fetch error:", err))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b132b] py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 items-start animate-pulse">

          {/* Sidebar skeleton */}
          <div className="w-full lg:w-[300px] shrink-0 space-y-4">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 space-y-4">
              <div className="h-4 bg-gray-700 rounded w-2/3" />
              <div className="h-0.5 w-10 bg-gray-700 rounded" />
              <div className="w-20 h-20 bg-gray-700 rounded-xl mx-auto" />
              <div className="flex justify-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="w-4 h-4 bg-gray-700 rounded-full" />
                ))}
              </div>
              <div className="space-y-2">
                <div className="h-3 bg-gray-700 rounded w-full" />
                <div className="h-3 bg-gray-700 rounded w-5/6" />
                <div className="h-3 bg-gray-700 rounded w-4/6" />
              </div>
              <div className="h-9 bg-gray-700 rounded-xl" />
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 space-y-3">
              <div className="h-4 bg-gray-700 rounded w-1/2" />
              <div className="h-0.5 w-10 bg-gray-700 rounded" />
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-3 bg-gray-700 rounded w-3/4" />
              ))}
            </div>
          </div>

          {/* Main area skeleton */}
          <div className="flex-1 min-w-0 space-y-4">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 flex gap-5">
              <div className="w-24 h-24 bg-gray-700 rounded-2xl shrink-0" />
              <div className="flex-1 space-y-3 py-1">
                <div className="h-6 bg-gray-700 rounded w-1/3" />
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="w-5 h-5 bg-gray-700 rounded-full" />
                  ))}
                </div>
                <div className="h-6 bg-gray-700 rounded-full w-36" />
              </div>
            </div>
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-gray-900 border border-gray-800 rounded-2xl flex overflow-hidden">
                <div className="w-24 h-24 bg-gray-800 shrink-0" />
                <div className="flex-1 px-4 py-4 space-y-2">
                  <div className="h-4 bg-gray-700 rounded w-3/4" />
                  <div className="h-3 bg-gray-700 rounded w-full" />
                  <div className="flex gap-2">
                    <div className="h-5 bg-gray-700 rounded-full w-16" />
                    <div className="h-5 bg-gray-700 rounded-full w-12" />
                    <div className="h-5 bg-gray-700 rounded-full w-16" />
                  </div>
                </div>
                <div className="flex items-center px-4 shrink-0">
                  <div className="h-9 bg-gray-700 rounded-xl w-24" />
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    );
  }

  if (!store) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0b132b]">
        <p className="text-xl text-gray-400">Store not found.</p>
      </div>
    );
  }

  const logoUrl = store.logo
    ? urlFor(store.logo).width(200).height(200).fit("crop").url()
    : null;

  const logoSmUrl = store.logo
    ? urlFor(store.logo).width(80).height(80).fit("crop").url()
    : null;

  const couponCount = store.coupons?.length ?? 0;

  return (
    <div className="min-h-screen bg-[#0b132b] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 items-start">

        {/* ── LEFT SIDEBAR ─────────────────────────────────────────── */}
        <aside className="w-full lg:w-[300px] shrink-0 space-y-4 lg:sticky lg:top-[90px]">

          {/* Card 1: About Store */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 shadow-sm">
            <h2 className="text-base font-bold text-white mb-1">
              About <span className="text-yellow-400">{store.name}</span>
            </h2>
            <div className="h-0.5 w-10 bg-yellow-400 rounded mb-4" />

            {/* Logo */}
            <div className="flex justify-center mb-4">
              {logoSmUrl ? (
                <div className="w-20 h-20 rounded-xl flex items-center justify-center overflow-hidden border border-white/30">
                  <img src={logoSmUrl} alt={store.name} className="w-full h-full object-contain" />
                </div>
              ) : (
                <div className="w-20 h-20 bg-yellow-400 rounded-xl flex items-center justify-center">
                  <span className="text-black font-bold text-2xl">
                    {store.name?.charAt(0) || "S"}
                  </span>
                </div>
              )}
            </div>

            {/* Star rating */}
            <div className="flex items-center justify-center gap-2 mb-3">
              <StarRating rating={store.rating ?? 5} size="sm" />
              <span className="text-sm text-gray-400">{store.rating ?? 5}/5</span>
            </div>

            {/* Description */}
            {store.description ? (
              <p className="text-sm text-gray-400 leading-relaxed mb-4">{store.description}</p>
            ) : (
              <p className="text-sm text-gray-600 italic mb-4">No description available.</p>
            )}

            {/* Visit Store button */}
            {store.affiliateLink && (
              <a
                href={store.affiliateLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-yellow-400 hover:bg-yellow-300 text-black font-semibold text-sm py-2.5 rounded-xl transition-all duration-300"
              >
                Visit Store <ExternalLink size={13} />
              </a>
            )}
          </div>

          {/* Card 2: Popular Stores */}
          {store.popularStores?.length > 0 && (
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 shadow-sm">
              <h2 className="text-base font-bold text-white mb-1">
                Popular <span className="text-yellow-400">Stores</span>
              </h2>
              <div className="h-0.5 w-10 bg-yellow-400 rounded mb-4" />
              <ul className="space-y-1">
                {store.popularStores.map((ps, i) => (
                  <li key={i}>
                    <Link
                      href={`/stores/${ps.slug?.current}`}
                      className="group flex items-center justify-between text-sm text-gray-300 hover:text-yellow-400 font-medium transition-colors duration-200 py-1.5"
                    >
                      <span>{ps.name}</span>
                      <ChevronRight size={14} className="text-gray-600 group-hover:text-yellow-400 transition-colors" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>

        {/* ── RIGHT MAIN AREA ────────────────────────────────────────── */}
        <main className="flex-1 min-w-0 space-y-4">

          {/* Store header card */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 flex flex-col sm:flex-row items-center sm:items-start gap-5">
            {/* Logo */}
            <div className="shrink-0 w-24 h-24 border border-white/30 rounded-2xl flex items-center justify-center overflow-hidden">
              {logoUrl ? (
                <img src={logoUrl} alt={`${store.name} logo`} className="w-full h-full object-contain" />
              ) : (
                <span className="text-3xl font-bold text-yellow-400">
                  {store.name?.charAt(0) || "S"}
                </span>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight mb-2">
                {store.name}
              </h1>
              <div className="flex items-center gap-2 justify-center sm:justify-start mb-3">
                <StarRating rating={store.rating ?? 5} />
                <span className="text-sm text-gray-400 font-medium">{store.rating ?? 5}/5</span>
              </div>
              <span className="inline-block bg-yellow-400 text-black text-sm font-bold px-3 py-1 rounded-full">
                {couponCount > 0
                  ? `${couponCount} Coupon${couponCount !== 1 ? "s" : ""} Available`
                  : "No Coupons Yet"}
              </span>
            </div>
          </div>

          {/* Coupons heading */}
          <div className="px-1">
            <h2 className="text-lg font-bold text-white">
              {couponCount > 0
                ? `${couponCount} Coupon${couponCount !== 1 ? "s" : ""} & Deals for `
                : "No Coupons Yet for "}
              <span className="text-yellow-400">{store.name}</span>
            </h2>
          </div>

          {/* Coupon list */}
          {couponCount > 0 ? (
            <div className="space-y-3">
              {store.coupons.map((coupon) => (
                <CouponCard
                  key={coupon._id}
                  coupon={coupon}
                  storeLogo={store.logo}
                  storeName={store.name}
                  affiliateLink={store.affiliateLink}
                />
              ))}
            </div>
          ) : (
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-10 text-center">
              <p className="text-gray-400 text-base">
                No coupons available yet. Check back soon!
              </p>
            </div>
          )}
        </main>

      </div>
    </div>
  );
}
