import React from 'react';

const OrganizeEventsPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-300 flex items-center justify-center p-8">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-8" style={{ fontFamily: 'monospace' }}>Organize Events</h1>
        <div className="relative overflow-hidden whitespace-nowrap">
          <div className="inline-block text-3xl text-yellow-500 animate-marquee" style={{ fontFamily: 'monospace' }}>
            Coming Soon! Stay Tuned for Exciting Events!
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizeEventsPage;
