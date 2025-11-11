"use client";
import Image from "next/image";
import Link from "next/link";
import { getCategoryColor } from "@/lib/categoryColors";
import PostCarousel from "../popular-categories/post-carousel";


const FeaturedSection = ({ blogs = [] }) => {
  // Extract featured and recent posts from the blogs array
  const featuredPosts = blogs.slice(0, 5);
  const recentPosts = blogs.slice(5, 8);

  return (
 
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 transition-colors duration-500">
      
      {/* ------------------------------ Heading ----------------------------- */}
      <div className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-bold text-[#050e38] dark:text-white tracking-tight mb-3">
          Top Deals <span className="text-yellow-400">| Reviews</span>
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
          Hot picks, smart buys, and trending reviews — all in one place.
        </p>
      </div>

      {/* ------------------------------ Content Grid ------------------------ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* ====================== Left: Featured Carousel ====================== */}
        <div className="lg:col-span-2">
          <PostCarousel posts={featuredPosts} />
        </div>

        {/* ===================== Right: Recent Highlights ====================== */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white border-b-2 border-gray-200 dark:border-gray-700 pb-3">
            Recent Highlights
          </h2>

          {/* Loop through recent posts */}
          {recentPosts.map((post) => {
            const colorClass = getCategoryColor(post.category);

            return (
              <Link
                key={post._id}
                href={`/blog/${post.slug}`}
                className="group block bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl border border-gray-100 dark:border-gray-700 hover:-translate-y-1 transition-all duration-500"
              >
                {/* ---------------------- Post Card Layout --------------------- */}
                <div className="flex flex-col sm:flex-row h-full">

                  {/* Image Section */}
                  <div className="relative w-full sm:w-2/5 h-40 sm:h-auto overflow-hidden">
                    <Image
                      src={
                        post.image ||
                        post.mainImage?.asset?.url ||
                        "/placeholder.svg"
                      }
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Category Badge */}
                    <div className="absolute top-2 left-2">
                      <span
                        className={`${colorClass} text-white text-[10px] font-bold px-3 py-1.5 rounded-lg uppercase tracking-wider shadow-md backdrop-blur-sm`}
                      >
                        {post.category || "General"}
                      </span>
                    </div>
                  </div>

                  {/* Text Content Section */}
                  <div className="w-full sm:w-3/5 p-5 flex flex-col justify-center">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-yellow-400 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
