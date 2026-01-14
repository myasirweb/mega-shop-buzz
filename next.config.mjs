import { fileURLToPath } from "url";
import path from "path";

/** @type {import('next').NextConfig} */

// __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nextConfig = {
  compiler: {
    styledComponents: true,
  },

  // ✅ This must NOT be inside experimental in Next 15
  outputFileTracingRoot: __dirname,

  // ✅ Allow Sanity & placeholder images
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
    ],
  },
};

export default nextConfig;
