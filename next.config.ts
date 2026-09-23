import type { NextConfig } from "next";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const githubPages = process.env.GITHUB_PAGES === "1";

const nextConfig: NextConfig = {
  ...(githubPages
    ? {
        output: "export",
        trailingSlash: true,
        images: { unoptimized: true },
        ...(basePath ? { basePath, assetPrefix: basePath } : {}),
      }
    : {}),
  allowedDevOrigins: ["127.0.0.1", "localhost", "*.localhost", "0.0.0.0"],
};

export default nextConfig;
