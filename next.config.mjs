/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.talkmate.com.au' }],
        destination: 'https://talkmate.com.au/:path*',
        permanent: true,
      },
      {
        // Bare /receptionist has no content of its own (only /receptionist/[slug]).
        // Send anyone who lands here to the homepage's team section.
        source: '/receptionist',
        destination: '/industries',
        permanent: false,
      },
      {
        // The old demo booking page is replaced by the free trial page.
        source: '/demo',
        destination: '/trial',
        permanent: false,
      },
    ]
  },
  reactStrictMode: true,
}

export default nextConfig
