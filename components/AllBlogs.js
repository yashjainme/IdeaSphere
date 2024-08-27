

'use client';
import React, { useEffect, useState } from 'react';
import BlogCard from './BlogCard';

const AllBlogs = () => {
  const [allBlogs, setAllBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getAllBlogs = async () => {
      try {
        const response = await fetch('/api/getAllBlogs');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setAllBlogs(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getAllBlogs();
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
    <svg className="animate-spin h-12 w-12 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  </div>
  )
  if (error) return <div className="text-center text-red-500 py-6">Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      {allBlogs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {allBlogs.map((blog) => (
            <BlogCard
              key={blog._id}
              imageUrl={blog.coverImageUrl}
              description={blog.description}
              title={blog.projectName}
              blogId={blog._id}
              username={blog.email}
            />
          ))}
        </div>
      ) : (
        <div className="text-gray-500 text-center py-6">
          No blogs found.
        </div>
      )}
    </div>
  );
};

export default AllBlogs;
