import React from 'react';

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-300 flex flex-col items-center p-8">
      <h1 className="text-5xl font-bold mb-8" style={{ fontFamily: 'monospace' }}>Contact Us</h1>
      <div className="max-w-3xl text-center">
        <p className="mb-4 text-xl" style={{ fontFamily: 'monospace' }}>
          {"We'd love to hear from you! Whether you have a question, feedback, or just want to say hello, feel free to reach out to us."}
        </p>
        <p className="mb-4" style={{ fontFamily: 'monospace' }}>
          You can contact us through the following channels:
        </p>
        <div className="mb-4" style={{ fontFamily: 'monospace' }}>
          <p><span className="text-yellow-500">Email:</span> support@ideasphere.com</p>
          <p><span className="text-yellow-500">Phone:</span> +1 (234) 567-890</p>
          <p><span className="text-yellow-500">Address:</span> 123 Innovation Drive, Creativity City, IC 12345</p>
        </div>
        <p className="mb-4" style={{ fontFamily: 'monospace' }}>
          You can also follow us on our social media channels to stay updated with the latest news and updates:
        </p>
        <div className="flex justify-center space-x-4 mb-4" style={{ fontFamily: 'monospace' }}>
          <a href="https://www.facebook.com/ideasphere" className="text-yellow-500 hover:underline">Facebook</a>
          <a href="https://www.twitter.com/ideasphere" className="text-yellow-500 hover:underline">Twitter</a>
          <a href="https://www.linkedin.com/company/ideasphere" className="text-yellow-500 hover:underline">LinkedIn</a>
        </div>
        <p className="text-yellow-500" style={{ fontFamily: 'monospace' }}>
          Thank you for being a part of <span className="text-yellow-500">IdeaSphere</span>. We look forward to connecting with you!
        </p>
      </div>
    </div>
  );
};

export default ContactPage;
