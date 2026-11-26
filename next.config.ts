import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Exportação estática: a pasta `out/` pode ser publicada em qualquer hospedagem
  // (Vercel, Netlify, Cloudflare Pages, S3, servidor Nginx).
  output: "export",
  // Subcaminho quando publicado como "project page" do GitHub Pages (ex.: /landing-ministerioon).
  // Vazio em domínio próprio.
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
  trailingSlash: true,
  images: { unoptimized: true },
  poweredByHeader: false,
};

export default nextConfig;
