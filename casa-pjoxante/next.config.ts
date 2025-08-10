import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'aoonzqwsjrpzahjrebkf.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/about-images/**',
      },
      {
        protocol: 'https',
        hostname: 'aoonzqwsjrpzahjrebkf.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/projects-images/**',
      },
      {
        protocol: 'https',
        hostname: 'aoonzqwsjrpzahjrebkf.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/courses-images/**',
      },
    ],
  },
};

export default nextConfig;
