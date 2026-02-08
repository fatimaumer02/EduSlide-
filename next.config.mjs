/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,

  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains',
          },
        ],
      },
    ];
  },

  // Disable x-powered-by header
  poweredByHeader: false,

  // Allow pdfjs-dist worker (used by pdf-parse) to run on the server
  serverExternalPackages: ['pdfjs-dist'],

  // Required for Turbopack (Next.js 16 default)
  turbopack: {},
};

export default nextConfig;
