"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CalendarDays, User, Tag } from "lucide-react";
import { PortableText } from "@portabletext/react";

/* -------------------------------------------------------------------------- */
/*                         PortableText Custom Components                     */
/* -------------------------------------------------------------------------- */
// Used for rendering Sanity's rich text fields with custom styles and behaviors.
const portableTextComponents = {
  types: {
    image: ({ value }) => (
      <div className="my-10 flex justify-center">
        <Image
          src={value.asset?.url}
          alt={value.alt || "Blog image"}
          width={800}
          height={500}
          className="rounded-2xl shadow-lg object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
    ),
  },
  marks: {
    link: ({ value, children }) => {
      const target = (value?.href || "").startsWith("http") ? "_blank" : undefined;
      return (
        <a
          href={value?.href}
          target={target}
          rel={target === "_blank" ? "noopener noreferrer" : undefined}
          className="text-amber-500 underline hover:text-amber-600 transition-colors"
        >
          {children}
        </a>
      );
    },
  },
};

/* -------------------------------------------------------------------------- */
/*                              Blog Detail Page                              */
/* -------------------------------------------------------------------------- */

export default function BlogDetail({ blog }) {
  /* ---------------------------- Blog Validation --------------------------- */
  // Handle case when no blog data is passed (404 or missing content)
  if (!blog) {
    return (
      <section className="min-h-screen flex items-center justify-center text-gray-600 dark:text-gray-300">
        Blog not found.
      </section>
    );
  }

  /* ------------------------------------------------------------------------ */
  /*                                Page Layout                               */
  /* ------------------------------------------------------------------------ */
  return (
    <section className="min-h-screen bg-gray-50 dark:bg-gray-950 py-20 px-6 lg:px-12 font-inter transition-colors duration-500">
      <div className="max-w-5xl mx-auto">
        
        {/* ------------------------------------------------------------------ */}
        {/*                       Header: Back Button + Meta Info              */}
        {/* ------------------------------------------------------------------ */}
        <div className="mb-10">
          <Link
            href={`/categories/${blog.category?.toLowerCase() || ""}`}
            className="inline-flex items-center px-5 py-2.5 text-sm font-medium rounded-full 
                       bg-amber-500 text-white hover:bg-amber-600 
                       transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to {blog.category}
          </Link>
        </div>

        <header className="text-center mb-12">
          {/* Blog Title */}
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
            {blog.title}
          </h1>

          {/* Blog Excerpt */}
          {blog.excerpt && (
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-6 font-medium">
              {blog.excerpt}
            </p>
          )}

          {/* Blog Meta Info */}
          <div className="flex items-center justify-center gap-5 text-sm text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1">
              <User className="w-4 h-4 text-amber-500" />
              {blog.author || "Admin"}
            </span>
            <span className="flex items-center gap-1">
              <CalendarDays className="w-4 h-4 text-amber-500" />
              {new Date(blog.publishedAt || Date.now()).toLocaleDateString()}
            </span>
            <span className="flex items-center gap-1">
              <Tag className="w-4 h-4 text-amber-500" />
              {blog.category}
            </span>
          </div>
        </header>

        {/* ------------------------------------------------------------------ */}
        {/*                            Featured Image                          */}
        {/* ------------------------------------------------------------------ */}
        {blog.image && (
          <div className="relative w-full h-[500px] rounded-2xl overflow-hidden mb-12 shadow-xl border border-gray-200 dark:border-gray-800">
            <Image
              src={blog.image}
              alt={blog.title}
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
              priority
            />
          </div>
        )}

        {/* ------------------------------------------------------------------ */}
        {/*                         Blog Content (Rich Text)                   */}
        {/* ------------------------------------------------------------------ */}
        <article className="prose dark:prose-invert max-w-none text-lg leading-relaxed text-gray-700 dark:text-gray-300">
          {blog.body ? (
            <PortableText value={blog.body} components={portableTextComponents} />
          ) : (
            <p>{blog.excerpt}</p>
          )}
        </article>

        {/* ------------------------------------------------------------------ */}
        {/*                      Optional Pro Article Badge                    */}
        {/* ------------------------------------------------------------------ */}
        {blog.isPro && (
          <div className="mt-12 text-center">
            <span className="inline-block bg-amber-100 text-amber-800 font-semibold px-6 py-2 rounded-full text-sm shadow-sm">
              Pro Exclusive Article
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
