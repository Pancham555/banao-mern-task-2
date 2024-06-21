/** @type {import('next').NextConfig} */
const nextConfig = {
  crossOrigin: "use-credentials",
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};

export default nextConfig;
