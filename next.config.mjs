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
    ]
  },
  reactStrictMode: true,
}

export default nextConfig
