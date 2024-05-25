/** @type {import('next').NextConfig} */
const nextConfig = {
    // Other configuration options
    async redirects() {
      return [
        {
          source: '/@:username',
          destination: '/user/:username',
          permanent: true,
        },
      ];
    },
  };
  
  export default nextConfig;
  