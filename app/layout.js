import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "Mega Shop Buzz | Trending Blogs & Product Insights",
    template: "%s | Mega Shop Buzz",
  },
  description:
    "Mega Shop Buzz is your go-to platform for trending blogs, shopping guides, and the latest product reviews from around the world.",
  icons: {
    icon: "/favicon.ico", // ✅ this is enough — don’t add <head>
    apple: "/favicon.ico",
  },
  openGraph: {
    title: "Mega Shop Buzz — Trending Blogs & Product Reviews",
    description:
      "Explore the latest trends, product reviews, and shopping insights with Mega Shop Buzz.",
    url: "https://megashopbuzz.vercel.app",
    siteName: "Mega Shop Buzz",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Mega Shop Buzz Website Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mega Shop Buzz — Trending Blogs",
    description:
      "Read the latest product reviews, fashion trends, and shopping updates from Mega Shop Buzz.",
    images: ["/og-image.jpg"],
  },
  metadataBase: new URL("https://megashopbuzz.vercel.app"),
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-100`}
      >
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
