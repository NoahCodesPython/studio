
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'charancodes.me',
        port: '',
        pathname: '/**',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block', 
          },
          {
            key: 'Content-Security-Policy',
            // This is a basic CSP. It might need to be adjusted based on external resources or inline scripts/styles.
            // 'unsafe-eval' may be needed for some development features or libraries.
            // 'unsafe-inline' for styles is often necessary for CSS-in-JS or UI libraries that apply styles dynamically.
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https://placehold.co; font-src 'self' https://fonts.gstatic.com; object-src 'none'; frame-ancestors 'self';"
          },
          // Strict-Transport-Security (HSTS)
          // Be cautious enabling HSTS, especially the 'preload' directive.
          // Ensure your site is fully HTTPS and you understand the implications before uncommenting.
          // {
          //   key: 'Strict-Transport-Security',
          //   value: 'max-age=63072000; includeSubDomains; preload',
          // },
        ],
      },
    ];
  },
};

export default nextConfig;
