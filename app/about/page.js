import React from 'react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-300 flex flex-col items-center p-8">
      <h1 className="text-5xl font-bold mb-8" style={{ fontFamily: 'monospace' }}>About Us</h1>
      <div className="max-w-3xl text-center">
        <p className="mb-4 text-2xl" style={{ fontFamily: 'monospace' }}>
          Welcome to <span className="text-yellow-500">IdeaSphere</span>!
        </p>
        <p className="mb-4" style={{ fontFamily: 'monospace' }}>
        <span className="text-yellow-500">IdeaSphere</span> {"is a platform where creative minds come together to share and explore innovative ideas. Whether you're an entrepreneur, a developer, a designer, or just someone with a unique perspective, our platform is designed to foster collaboration and inspire new projects."}
        </p>
        <p className="mb-4" style={{ fontFamily: 'monospace' }}>
          Our mission is to create a space where ideas can flourish. We believe in the power of community and the importance of sharing knowledge. With <span className="text-yellow-500">IdeaSphere</span>, you can create blog posts to showcase your projects, share your thoughts, and connect with like-minded individuals.
        </p>
        <p className="mb-4" style={{ fontFamily: 'monospace' }}>
          Key Features:
        </p>
        <ul className="list-disc list-inside mb-4" style={{ fontFamily: 'monospace' }}>
          <li>Post and share your innovative ideas and projects.</li>
          <li>Engage with a community of thinkers and creators.</li>
          <li>Find inspiration from the ideas shared by others.</li>
          <li>Collaborate with users from various backgrounds.</li>
        </ul>
        <p className="mb-4" style={{ fontFamily: 'monospace' }}>
          Join us in our journey to build a vibrant community of innovation and creativity. {"Let's bring your ideas to life!"}
        </p>
        <p className="text-yellow-500" style={{ fontFamily: 'monospace' }}>
          Thank you for being a part of <span className="text-yellow-500">IdeaSphere</span>.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
