/** @type {import('next').NextConfig} */
const nextConfig = {
  // Existing configuration
  async redirects() {
    return [
      {
        source: '/@:username',
        destination: '/user/:username',
        permanent: true,
      },
    ];
  },
  
  // Add this new configuration for images
  images: {
    domains: ['i.imgur.com', 'images.pexels.com'],
  },
};

export default nextConfig;