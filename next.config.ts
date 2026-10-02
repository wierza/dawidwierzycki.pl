import type { NextConfig } from "next";

// Strona statyczna (folder out/) — wgrywana na hosting Hostinger.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
