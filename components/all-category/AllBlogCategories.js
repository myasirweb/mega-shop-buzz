"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { allCategoriesQuery } from "@/sanity/lib/queries";

export default function AllBlogCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  /* -------------------------------------------------------------------------- */
  /*                             Fetch Categories                             */
  /* -------------------------------------------------------------------------- */
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await client.fetch(allCategoriesQuery);
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  /* -------------------------------------------------------------------------- */
  /*                             Skeleton Loader UI                           */
  /* -------------------------------------------------------------------------- */
  if (loading) {
    return (
      <section className="min-h-screen bg-gray-50 dark:bg-gray-950 py-20 px-6 flex items-center justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full animate-pulse">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-80 bg-gray-200 dark:bg-gray-800 rounded-2xl shadow-sm"
            >
              <div className="h-48 bg-gray-300 dark:bg-gray-700 rounded-t-2xl"></div>
              <div className="p-5 space-y-3">
                <div className="w-3/4 h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
                <div className="w-1/2 h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  /* -------------------------------------------------------------------------- */
  /*                             No Categories Found                          */
  /* -------------------------------------------------------------------------- */
  if (!categories.length) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 dark:text-gray-300 text-lg">
        No categories found.
      </div>
    );
  }

  /* -------------------------------------------------------------------------- */
  /*                             Main Page Layout                             */
  /* -------------------------------------------------------------------------- */
  return (
    <section className="min-h-screen bg-gray-50 dark:bg-gray-950 py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        
        {/* ------------------------------------------------------------------ */}
        {/*                          Section Header                            */}
        {/* ------------------------------------------------------------------ */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-[#050e38] dark:text-white tracking-tight mb-3">
            Explore All <span className="text-yellow-400">Categories</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
            Discover topics that inspire you — explore our curated categories
            and dive deeper into the stories that matter.
          </p>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/*                          Categories Grid                           */}
        {/* ------------------------------------------------------------------ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link
              key={category._id}
              href={`/categories/${category.slug}`}
              className="group relative block overflow-hidden rounded-2xl shadow-md border border-gray-100 dark:border-gray-800 
                         bg-white dark:bg-gray-900 transition-all duration-500 hover:-translate-y-2 
                         hover:shadow-2xl hover:border-gray-200 dark:hover:border-gray-700"
            >
              {/* ------------------------- Category Image ------------------------ */}
              <div className="relative w-full h-72 sm:h-64 md:h-72 overflow-hidden rounded-t-2xl">
                <Image
                  src={
                    category.latestPostImage ||
                    "https://placehold.co/600x400/374151/ffffff?text=No+Image"
                  }
                  alt={category.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent transition-all duration-500 group-hover:from-black/80"></div>
              </div>

              {/* -------------------------- Overlay Content ---------------------- */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 pointer-events-none">
                {/* Accent Bar */}
                <div className="w-12 h-1 bg-yellow-400 mb-4 opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Category Title */}
                <h2 className="text-white text-2xl font-semibold tracking-tight leading-snug drop-shadow-lg">
                  {category.title}
                </h2>

                {/* Hover CTA (Call to Action) */}
                <div className="flex items-center space-x-2 mt-3 text-yellow-300 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <span className="text-sm font-medium uppercase tracking-wider">
                    View Blogs
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
          ))}
        </div>
      </div>
    </section>
  );
}
