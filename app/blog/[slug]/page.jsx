"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { singleBlogQuery } from "@/sanity/lib/queries";
import BlogDetail from "@/components/blog/BlogDetail";
import { motion } from "framer-motion";

/* -------------------------------------------------------------------------- */
/*                           Blog Detail Page                                 */
/* -------------------------------------------------------------------------- */
export default function BlogDetailPage() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  /* -------------------------- Fetch Single Blog --------------------------- */
  useEffect(() => {
    if (!slug) return;

    const fetchBlog = async () => {
      try {
        const data = await client.fetch(singleBlogQuery, { slug });
        setBlog(data);
      } catch (error) {
        console.error("Sanity Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  /* ----------------------------- Shimmer Loader ---------------------------- */
  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 transition-colors duration-500">
        <div className="w-full max-w-4xl mx-auto px-6 animate-pulse space-y-8">
          {/* Image Skeleton */}
          <div className="w-full h-80 bg-gray-200 dark:bg-gray-800 rounded-2xl"></div>

          {/* Title Skeleton */}
          <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded-md w-3/4 mx-auto"></div>

          {/* Meta Info Skeleton */}
          <div className="flex justify-center gap-4">
            <div className="h-4 w-24 bg-gray-200 dark:bg-gray-800 rounded"></div>
            <div className="h-4 w-24 bg-gray-200 dark:bg-gray-800 rounded"></div>
          </div>

          {/* Paragraph Skeleton */}
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-4 bg-gray-200 dark:bg-gray-800 rounded-md w-full"
              ></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  /* ----------------------------- Blog Detail ------------------------------- */
  if (!blog)
    return (
      <section className="min-h-screen flex items-center justify-center text-gray-600 dark:text-gray-300">
        Blog not found.
      </section>
    );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      <BlogDetail blog={blog} />
    </motion.div>
  );
}
