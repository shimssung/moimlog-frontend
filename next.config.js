/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // CSP 비활성화 (개발용)
          // {
          //   key: "Content-Security-Policy",
          //   value:
          //     "default-src 'self'; connect-src 'self' http://localhost:8080 https://localhost:8080; img-src 'self' data: https: blob:; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline';",
          // },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
