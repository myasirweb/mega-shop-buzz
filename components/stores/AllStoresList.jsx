"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { allStoresQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

/* ── Skeleton card — exact same shape as AllBlogCategories skeleton ──── */
function StoreSkeleton() {
  return (
    <div className="h-80 bg-gray-200 dark:bg-gray-800 rounded-2xl shadow-sm animate-pulse">
      <div className="h-48 bg-gray-300 dark:bg-gray-700 rounded-t-2xl"></div>
      <div className="p-5 space-y-3">
        <div className="w-3/4 h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
        <div className="w-1/2 h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
      </div>
    </div>
  );
}

/* ── Store card — card classes copied 1:1 from AllBlogCategories ─────── */
function StoreCard({ store }) {
  const slug = store.slug?.current;
  const logoUrl = store.logo
    ? urlFor(store.logo).width(400).height(400).url()
    : null;

  return (
    <Link
      href={`/stores/${slug}`}
      className="group relative block overflow-hidden rounded-2xl shadow-md border border-gray-100 dark:border-gray-800
                 bg-white dark:bg-gray-900 transition-all duration-500 hover:-translate-y-2
                 hover:shadow-2xl hover:border-gray-200 dark:hover:border-gray-700"
    >
      {/* Image container — same classes as category card */}
      <div className="relative w-full h-72 sm:h-64 md:h-72 overflow-hidden rounded-t-2xl bg-gray-100 dark:bg-gray-800">
        {logoUrl ? (
          <Image
            src={logoUrl}
            alt={store.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-contain p-10 transition-transform duration-700 ease-out group-hover:scale-110"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
            <span className="text-7xl font-bold text-yellow-400 select-none">
              {store.name?.charAt(0)?.toUpperCase() || "S"}
            </span>
          </div>
        )}

        {/* Gradient overlay — exact copy */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent transition-all duration-500 group-hover:from-black/80"></div>
      </div>

      {/* Overlay content — exact copy */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 pointer-events-none">

        {/* Accent bar — exact copy */}
        <div className="w-12 h-1 bg-yellow-400 mb-4 opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>

        {/* Store name — same classes as category title */}
        <h2 className="text-white text-2xl font-semibold tracking-tight leading-snug drop-shadow-lg">
          {store.name}
        </h2>

        {/* Coupon count badge */}
        {store.couponCount > 0 && (
          <span className="mt-2 self-start text-xs font-semibold text-yellow-400 bg-yellow-400/10 border border-yellow-400/30 px-2.5 py-0.5 rounded-full">
            {store.couponCount} Coupon{store.couponCount !== 1 ? "s" : ""}
          </span>
        )}

        {/* Hover CTA — exact copy, text changed to "Get Coupons" */}
        <div className="flex items-center space-x-2 mt-3 text-yellow-300 opacity-0 group-hover:opacity-100 transition-all duration-500">
          <span className="text-sm font-medium uppercase tracking-wider">
            Get Coupons
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5 transform transition-transform duration-500 group-hover:translate-x-2"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
}

/* ── Main component ─────────────────────────────────────────────────────── */
export default function AllStoresList() {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client
      .fetch(allStoresQuery)
      .then((data) => setStores(data || []))
      .catch((err) => console.error("Stores fetch error:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="min-h-screen bg-gray-50 dark:bg-gray-950 py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-500">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-[#050e38] dark:text-white tracking-tight mb-3">
              All <span className="text-yellow-400">Stores</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
              Explore top stores and grab the best coupon codes
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <StoreSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gray-50 dark:bg-gray-950 py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-500">
      <div className="max-w-7xl mx-auto">

        {/* Section heading — same pattern as AllBlogCategories */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-[#050e38] dark:text-white tracking-tight mb-3">
            All <span className="text-yellow-400">Stores</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
            Explore top stores and grab the best coupon codes
          </p>
        </div>

        {/* Grid — exact same classes as AllBlogCategories */}
        {stores.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
            {stores.map((store) => (
              <StoreCard key={store._id} store={store} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white dark:bg-gray-900 rounded-2xl shadow-inner">
            <p className="text-2xl font-medium text-gray-600 dark:text-gray-400 mb-3">
              No stores found.
            </p>
            <p className="text-lg text-gray-500 dark:text-gray-500">
              Check back soon for more stores.
            </p>
          </div>
        )}

      </div>
    </section>
  );
}
