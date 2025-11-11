"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { client } from "@/sanity/lib/client";
import { allBlogsQuery } from "@/sanity/lib/queries";
import { getCategoryColor } from "@/lib/categoryColors"; // ✅ import your helper

/* -------------------------------------------------------------------------- */
/*                               Helper Function                              */
/* -------------------------------------------------------------------------- */
function trimToWords(text, wordLimit = 20) {
  if (!text) return "";
  const words = text.split(" ");
  return words.length > wordLimit
    ? `${words.slice(0, wordLimit).join(" ")}...`
    : text;
}

/* -------------------------------------------------------------------------- */
/*                             Blog Card Component                            */
/* -------------------------------------------------------------------------- */
function BlogCard({ post }) {
  const shortDescription = trimToWords(post.excerpt, 20);
  const categoryColor = getCategoryColor(post.category); // ✅ use imported function

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group relative h-80 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl 
                 transition-all duration-500 bg-gray-900 cursor-pointer"
    >
      {/* Image */}
      <Image
        src={post.image || "/placeholder.svg"}
        alt={post.title || "Blog image"}
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        className="object-cover transition-transform duration-700 group-hover:scale-110"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />

      {/* Category Badge */}
      {post.category && (
        <div className="absolute top-4 left-4 z-10">
          <span
            className={`${categoryColor} text-white text-xs font-bold px-3 py-1.5 
                       rounded-full uppercase tracking-wide shadow-md`}
          >
            {post.category}
          </span>
        </div>
      )}

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 z-10">
        <h3 className="text-lg sm:text-xl font-semibold text-white mb-1 line-clamp-2 group-hover:text-yellow-400 transition-colors">
          {post.title || "Untitled Post"}
        </h3>
        <p className="text-sm text-gray-200 line-clamp-2">{shortDescription}</p>
      </div>

      {/* Hover Arrow */}
      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1">
        <ArrowRight className="w-5 h-5 text-yellow-400" />
      </div>
    </Link>
  );
}

/* -------------------------------------------------------------------------- */
/*                             Shimmer Loader Card                            */
/* -------------------------------------------------------------------------- */
function BlogSkeleton() {
  return (
    <div className="h-80 rounded-2xl overflow-hidden shadow-md bg-gray-200 dark:bg-gray-800 animate-pulse">
      <div className="h-48 bg-gray-300 dark:bg-gray-700"></div>
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
        <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
        <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                           All Blogs Page (Main)                            */
/* -------------------------------------------------------------------------- */
export default function AllBlogsList() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const data = await client.fetch(allBlogsQuery);
        setBlogs(data);
      } catch (error) {
        console.error("Sanity Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchBlogs();
  }, []);

  return (
    <section className="min-h-screen bg-gray-50 dark:bg-gray-950 py-20 px-6 lg:px-12 transition-colors duration-500 font-inter">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
            Latest <span className="text-yellow-400">Stories</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explore our latest articles and insights curated just for you.
          </p>
        </div>

        {/* Blog Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <BlogSkeleton key={i} />
            ))}
          </div>
        ) : blogs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {blogs.map((post) => (
              <BlogCard key={post._id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white dark:bg-gray-900 rounded-2xl shadow-inner">
            <p className="text-2xl font-medium text-gray-600 dark:text-gray-400 mb-3">
              😔 No blogs available yet.
            </p>
            <p className="text-lg text-gray-500 dark:text-gray-500">
              Check back soon for more updates.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
