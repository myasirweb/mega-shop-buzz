"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getCategoryColor } from "@/lib/categoryColors";

const PostCarousel = ({ posts = [] }) => {


  //  Track currently active slide index
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-slide every 5 seconds (only if posts exist)
  useEffect(() => {
    if (!posts.length) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % posts.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [posts.length]);

  //  Manual navigation (dot click)
  const goToSlide = (index) => setActiveIndex(index);

  return (
    <div className="relative h-[420px] sm:h-[480px] md:h-[580px] rounded-3xl overflow-hidden shadow-2xl transition-all duration-700 group">
      
      {/* ============================== Slides ============================== */}
      {posts.map((post, index) => (
        <Link
          key={post._id || index}
          href={`/blog/${post.slug?.current || post.slug}`}
          className={`absolute inset-0 block transition-opacity duration-1000 ease-in-out ${
            index === activeIndex ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* --------------------------- Slide Image --------------------------- */}
          <Image
            src={
              post.image ||
              post.mainImage?.asset?.url ||
              "/placeholder.svg"
            }
            alt={post.title}
            fill
            className="object-cover w-full h-full scale-105 group-hover:scale-110 transition-transform duration-1000"
          />

          {/* ------------------------- Dark Overlay -------------------------- */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

          {/* ------------------------ Category Badge ------------------------- */}
          <div className="absolute top-6 left-6">
            <span
              className={`${getCategoryColor(
                post.category
              )} text-white font-semibold px-4 py-2 text-sm rounded-full uppercase tracking-wider shadow-lg backdrop-blur-sm`}
            >
              {post.category || "General"}
            </span>
          </div>

          {/* -------------------------- Post Text ---------------------------- */}
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3 leading-tight drop-shadow-md">
              {post.title}
            </h2>
            <p className="text-base text-gray-200 line-clamp-2 mb-4 opacity-90">
              {post.excerpt}
            </p>
            <span className="inline-flex items-center text-yellow-400 font-medium text-sm group-hover:underline">
              Read More →
            </span>
          </div>
        </Link>
      ))}

      {/* =========================== Navigation Dots =========================== */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
        {posts.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === activeIndex
                ? "bg-yellow-400 w-6 shadow-md"
                : "bg-white/60 hover:bg-white/90"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default PostCarousel;
