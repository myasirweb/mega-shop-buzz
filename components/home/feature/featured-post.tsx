"use client";
import Image from "next/image";
import Link from "next/link";
import { getCategoryColor } from "@/lib/categoryColors";

export default function FeaturedPosts({ blogs = [] }) {

  const featuredPosts = blogs?.slice(0, 12) || [];
  if (!featuredPosts.length) return null;

  return (

    <section
      aria-labelledby="featured-posts-heading"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20"
    >
      {/* ---------------------------- Section Header ------------------------ */}
      <header className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-[#050e38] dark:text-white tracking-tight mb-3">
          Featured <span className="text-yellow-400">Posts</span>
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
          Discover what’s trending — fresh picks from every corner of the blog.
        </p>
      </header>

      {/* ---------------------------- Featured Grid ------------------------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {featuredPosts.map((post) => {
          const categoryColor = getCategoryColor(post.category);

          return (
            /* ========================== Blog Card ========================== */
            <Link
              key={post._id}
              href={`/blog/${post.slug}`}
              className="group relative block overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 dark:border-gray-700 transition-all duration-500 cursor-pointer"
            >
              {/* ------------------------ Blog Image ------------------------ */}
              <div className="relative h-64 w-full">
                <Image
                  src={
                    post.image ||
                    post.mainImage?.asset?.url ||
                    "/placeholder.svg"
                  }
                  alt={post.title || "Blog post image"}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  priority={false}
                />
              </div>

              {/* ---------------------- Overlay Gradient --------------------- */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />

              {/* ---------------------- Category Tag ------------------------ */}
              {post.category && (
                <span
                  className={`${categoryColor} absolute top-4 left-4 text-white text-xs font-semibold px-3 py-1 rounded-md uppercase tracking-wider shadow-md backdrop-blur-sm`}
                >
                  {post.category}
                </span>
              )}

              {/* ------------------------ Post Title ------------------------ */}
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-lg font-semibold text-white leading-tight line-clamp-2 group-hover:text-yellow-400 transition-colors duration-300">
                  {post.title}
                </h3>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
