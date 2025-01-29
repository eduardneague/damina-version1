/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // This will disable linting during production builds
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true, // This will ignore TypeScript errors during the build
  },
};

export default nextConfig;
