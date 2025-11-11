"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import CategoryPage from "@/components/all-category/category/CategoryPage";
import { client } from "@/sanity/lib/client";
import {
  allCategoriesQuery,
  blogsByCategoryQuery,
} from "@/sanity/lib/queries";
import { motion } from "framer-motion";

export default function CategorySlugPage() {
  const { slug } = useParams();
  const [category, setCategory] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ------------------------------ Fetch Data ------------------------------ */
  useEffect(() => {
    if (!slug) return;

    const fetchData = async () => {
      try {
        // Fetch all categories
        const categories = await client.fetch(allCategoriesQuery);

        // Find category by slug (string)
        const selectedCategory = categories.find((cat) => cat.slug === slug);
        setCategory(selectedCategory);

        // Fetch blogs under this category if found
        if (selectedCategory) {
          const categoryBlogs = await client.fetch(blogsByCategoryQuery, {
            slug,
          });
          setBlogs(categoryBlogs);
        }
      } catch (error) {
        console.error("Error fetching category or blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  /* ----------------------------- Shimmer Loader ---------------------------- */
  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 transition-colors duration-500">
        <div className="w-full max-w-6xl mx-auto px-6 animate-pulse space-y-10">
          {/* Title Skeleton */}
          <div className="h-10 w-2/3 mx-auto bg-gray-200 dark:bg-gray-800 rounded-md"></div>

          {/* Category Tabs Skeleton */}
          <div className="flex justify-center gap-4">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-8 w-24 bg-gray-200 dark:bg-gray-800 rounded-full"
              ></div>
            ))}
          </div>

          {/* Blog Cards Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-gray-200 dark:bg-gray-800 rounded-2xl h-72"
              ></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  /* --------------------------- Category Not Found --------------------------- */
  if (!category) {
    return (
      <section className="min-h-screen flex items-center justify-center text-gray-600 dark:text-gray-300">
        Category not found for slug: <span className="ml-2 font-semibold">{slug}</span>
      </section>
    );
  }

  /* --------------------------- Render Category Page ------------------------- */
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      <CategoryPage category={category} blogs={blogs} />
    </motion.div>
  );
}
