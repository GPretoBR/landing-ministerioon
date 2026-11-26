import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Exportação estática: a pasta `out/` pode ser publicada em qualquer hospedagem
  // (Vercel, Netlify, Cloudflare Pages, S3, servidor Nginx).
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  poweredByHeader: false,
};

export default nextConfig;
