"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock, User } from "lucide-react";

const BlogCard = ({ post }) => (
  <Link
    href={`/blog/${post.slug}`}
    className="group block overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 
               bg-white dark:bg-gray-900 shadow-md transition-all duration-300 
               hover:-translate-y-2 hover:shadow-xl"
  >
    {/*  Image Section */}
    <div className="relative w-full h-48 overflow-hidden">
      <Image
        src={post.image}
        alt={post.title}
        width={600}
        height={400}
        className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
    </div>

    {/*  Content Section */}
    <div className="p-5 flex flex-col justify-between">
      {/* Title + Arrow */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-yellow-400 transition-colors">
          {post.title}
        </h3>
        <ArrowRight
          className="w-5 h-5 text-yellow-400 opacity-0 transform translate-x-2 
                     transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0"
        />
      </div>

      {/* Description */}
      {/* <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
        {post.excerpt || "Read the latest insights and updates from our blog."}
      </p> */}

      {/* Metadata */}
      {/* <div className="flex justify-between items-center border-t border-gray-100 dark:border-gray-700 pt-3 text-xs text-gray-500 dark:text-gray-400">
        <span className="flex items-center">
          <Clock className="w-4 h-4 mr-1 text-yellow-400" />
          {new Date(post.publishedAt || Date.now()).toLocaleDateString()}
        </span>
        <span className="flex items-center">
          <User className="w-4 h-4 mr-1 text-yellow-400" />
          {post.author || "Admin"}
        </span>
      </div> */}
    </div>
  </Link>
);

const CategoryPage = ({ category, blogs }) => {
  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 text-gray-600 dark:text-gray-300 text-lg">
        Category not found.
      </div>
    );
  }

  const hasBlogs = blogs && blogs.length > 0;

  return (
    <section className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-500 pt-20 pb-24 px-4 sm:px-6 lg:px-8 font-inter">
      <div className="max-w-7xl mx-auto">
        {/*  Back Button */}
        <div className="mb-12">
          <Link
            href="/categories"
            className="inline-flex items-center px-5 py-2.5 text-sm font-medium rounded-full 
                     bg-yellow-400 text-white hover:bg-yellow-500 
                     transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Categories
          </Link>
        </div>

        {/*  Header */}
        <div className="text-left mb-16 border-l-4 border-yellow-400 pl-6">
          <p className="text-sm font-semibold text-yellow-500 uppercase tracking-widest mb-2">
            Category
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {category.title}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
            Explore {blogs.length} insightful articles under{" "}
            <span className="font-semibold text-yellow-400">{category.title}</span>.
          </p>
        </div>

        {/*  Blog Grid */}
        {hasBlogs ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {blogs.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white dark:bg-gray-900 rounded-2xl shadow-inner">
            <p className="text-2xl font-medium text-gray-600 dark:text-gray-400 mb-3">
              😔 No blogs available in this category yet.
            </p>
            <p className="text-lg text-gray-500 dark:text-gray-500">
              Check back soon for more updates.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default CategoryPage;
