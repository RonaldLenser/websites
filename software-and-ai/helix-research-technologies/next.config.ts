import type { NextConfig } from "next";

// STATIC_EXPORT=1 builds a static site for GitHub Pages (preview only).
// The lead API needs a server, so on Pages the form falls back to email.
const isStatic = process.env.STATIC_EXPORT === "1";
const basePath = process.env.BASE_PATH || "";

const nextConfig: NextConfig = {
  ...(isStatic
    ? {
        output: "export",
        basePath,
        assetPrefix: basePath || undefined,
        trailingSlash: true,
        images: { unoptimized: true },
      }
    : {}),
  env: {
    NEXT_PUBLIC_STATIC_EXPORT: isStatic ? "1" : "",
    NEXT_PUBLIC_BASE_PATH: basePath,
    NEXT_PUBLIC_LEAD_ENDPOINT: process.env.LEAD_ENDPOINT || "",
  },
};

export default nextConfig;
