import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: ["github.com", "linkedin.com"], // Add domains you'll use for images
  },
};

export default nextConfig;
