"use client";
import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { getCategoryColor } from "@/lib/categoryColors";


export default function PopularCategories({ blogs = [] }) {


  // Extract unique categories from all blogs (limit to 5)
  const allCategories = useMemo(
    () => [...new Set(blogs.map((b) => b.category).filter(Boolean))].slice(0, 5),
    [blogs]
  );

  // Track selected category (default: "All")
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Filter blogs dynamically based on selected category (click only)
  const filteredBlogs = useMemo(() => {
    return selectedCategory === "All"
      ? blogs
      : blogs.filter((post) => post.category === selectedCategory);
  }, [selectedCategory, blogs]);

  /* ------------------------------------------------------------------------ */
  /*                                UI Section                                */
  /* ------------------------------------------------------------------------ */
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 transition-colors duration-500">
      
      {/* ============================ Section Header ============================ */}
      <header className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-[#050e38] dark:text-white tracking-tight mb-3">
          <span className="text-yellow-400">Popular</span> Categories
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
          Explore blogs, reviews & trending product categories — handpicked for you.
        </p>
      </header>

      {/* ============================ Category Buttons ============================ */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {["All", ...allCategories].map((cat) => {
          const isActive = selectedCategory === cat;

          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)} // Click to filter
              className={`px-6 py-2.5 rounded-full text-sm sm:text-base font-semibold tracking-wide cursor-pointer transition-all duration-300 transform ${
                isActive
                  ? "bg-yellow-400 text-black shadow-md scale-105"
                  : "bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-300 hover:bg-yellow-300 hover:text-black"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* ============================== Blogs Grid =============================== */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
        {filteredBlogs.length ? (
          filteredBlogs.map((post) => (
            /* ---------------------------- Blog Card ---------------------------- */
            <Link
              key={post._id}
              href={`/blog/${post.slug}`}
              className="group block bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl border border-gray-100 dark:border-gray-700 hover:-translate-y-1 transition-all duration-500 cursor-pointer"
            >
              {/* ---------------------------- Blog Image ---------------------------- */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={
                    post.image ||
                    post.mainImage?.asset?.url ||
                    "/placeholder.svg"
                  }
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* ------------------------ Category Label ------------------------ */}
                <div className="absolute top-3 left-3">
                  <span
                    className={`${getCategoryColor(
                      post.category
                    )} text-white text-xs font-semibold px-3 py-1.5 rounded-md uppercase tracking-wider shadow-md backdrop-blur-sm`}
                  >
                    {post.category}
                  </span>
                </div>
              </div>

              {/* -------------------------- Blog Content --------------------------- */}
              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-yellow-400 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                  {post.excerpt}
                </p>
              </div>
            </Link>
          ))
        ) : (
          /* ----------------------- No Posts Fallback ----------------------- */
          <p className="text-center text-gray-500 dark:text-gray-400 col-span-full text-lg font-medium py-12">
            No posts found for this category.
          </p>
        )}
      </div>

      {/* =========================== Browse All Button ============================ */}
      <div className="text-center">
        <Link
          href="/all-blogs"
          className="inline-block px-6 py-2.5 bg-black text-white border border-black dark:border-white text-lg rounded-md hover:bg-white hover:text-black dark:hover:bg-white dark:hover:text-black transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg cursor-pointer"
        >
          Browse All Posts
        </Link>
      </div>
    </section>
  );
}
