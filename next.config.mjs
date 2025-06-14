/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  serverComponentsExternalPackages: ["mongoose"],
  images: {
    domains: ["lh3.googleusercontent.com"],
  },
  webpack(config) {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    };
    config.cache = {
      type: "filesystem", // Use filesystem caching to reduce memory usage
    };
    return config;
  },
};

export default nextConfig;
