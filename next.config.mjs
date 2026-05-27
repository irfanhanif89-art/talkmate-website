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
        destination: '/#team',
        permanent: false,
      },
    ]
  },
  reactStrictMode: true,
}

export default nextConfig
