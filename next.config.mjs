import { fileURLToPath } from "url";
import path from "path";

/** @type {import('next').NextConfig} */

// __dirname ko manually define karte hain for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  experimental: {
    outputFileTracingRoot: __dirname,
  },

  // ✅ Allow Sanity & Placeholder image domains
  images: {
    domains: ["cdn.sanity.io", "placehold.co"],
  },
};

export default nextConfig;
