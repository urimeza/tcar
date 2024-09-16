/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
    //   {
    //     source: "/api/:path*",
    //     destination: "http://192.168.0.105:3001/:path*",
    //   },
    ];
  },
};

export default nextConfig;
