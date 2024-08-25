

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

  if (loading) return <div className="text-center py-6">Loading...</div>;
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
