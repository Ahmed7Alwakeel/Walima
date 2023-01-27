const { i18n } = require('./next-i18next.config')

module.exports = {
  i18n,
  images: {
    domains: [
      "fra1.digitaloceanspaces.com",
      "walima-space.fra1.digitaloceanspaces.com",
    ]
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'on',
          }, 
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGI',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
        },
        {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(),fullscreen=()'
        }
        ]
      }
    ]
  }
}