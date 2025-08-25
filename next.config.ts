/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "images.unsplash.com",
      "cdn1.iconfinder.com",
      "raw.githubusercontent.com",
      "via.placeholder.com",
      "images.beta.cosmos.so",
      "hebbkx1anhila5yf.public.blob.vercel-storage.com"
    ],
  },

  // Optional: disable errors on production build
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;