"use client";

import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import { allBlogsQuery } from "@/sanity/lib/queries";
import PopularCategories from "./popular-categories/popular-categories";
import FeaturedSection from "./feature/featured-section";
import FeaturedPosts from "./feature/featured-post";
import { motion } from "framer-motion";

/* -------------------------------------------------------------------------- */
/*                              🔹 Shimmer Loader                             */
/* -------------------------------------------------------------------------- */
function ShimmerLoader() {
  return (
    <section className="min-h-screen bg-gray-50 dark:bg-gray-950 py-20 px-6 lg:px-12 animate-pulse">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Section Header */}
        <div className="text-center space-y-4">
          <div className="h-8 w-1/3 bg-gray-200 dark:bg-gray-800 rounded mx-auto"></div>
          <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-800 rounded mx-auto"></div>
        </div>

        {/* Featured Carousel Skeleton */}
        <div className="h-[420px] sm:h-[480px] md:h-[580px] rounded-3xl bg-gray-200 dark:bg-gray-800"></div>

        {/* Popular Categories Skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="h-72 rounded-2xl bg-gray-200 dark:bg-gray-800"
            ></div>
          ))}
        </div>

        {/* Featured Posts Skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="h-64 rounded-2xl bg-gray-200 dark:bg-gray-800"
            ></div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                             🔹 HomeSection Page                            */
/* -------------------------------------------------------------------------- */
export default function HomeSection() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ----------------------------- Fetch Blogs ----------------------------- */
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await client.fetch(allBlogsQuery);
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  /* -------------------------------------------------------------------------- */
  /*                            Loading Shimmer View                            */
  /* -------------------------------------------------------------------------- */
  if (loading) {
    return <ShimmerLoader />;
  }

  /* -------------------------------------------------------------------------- */
  /*                                No Blogs Fallback                           */
  /* -------------------------------------------------------------------------- */
  if (!blogs.length) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 text-gray-600 dark:text-gray-300 text-lg font-medium">
        No blogs available at the moment.
      </section>
    );
  }

  /* -------------------------------------------------------------------------- */
  /*                                Render Content                              */
  /* -------------------------------------------------------------------------- */
  return (
    <motion.main
      className="bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-[var(--font-body)] transition-colors duration-500"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      {/* --------------------------- Featured Section -------------------------- */}
      <section className="pt-2 pb-4">
        <FeaturedSection blogs={blogs} />
      </section>

      {/* --------------------------- Popular Categories ------------------------ */}
      <section className="py-4 bg-gray-100 dark:bg-gray-900">
        <PopularCategories blogs={blogs} />
      </section>

      {/* --------------------------- Featured Posts ---------------------------- */}
      <section className="py-4">
        <FeaturedPosts blogs={blogs} />
      </section>
    </motion.main>
  );
}
