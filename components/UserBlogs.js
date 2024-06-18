

// UserBlogs.js
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const UserBlogs = ({ username }) => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchUserBlogs = async () => {
      try {
        const response = await fetch(`/api/getUserBlogs`);
        if (response.ok) {
          const blogsData = await response.json();
          setBlogs(blogsData);
        }
      } catch (error) {
        console.error('Error fetching user blogs:', error);
      }
    };

    fetchUserBlogs();
  }, []);

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {blogs.length > 0 ? (
        blogs.map((blog) => (
          <Link
            className="h-fit"
            key={blog._id}
            target="_blank"
            href={`/${username}/blogs/${blog._id}`}
          >
            <div className="bg-gray-800 text-white px-4 py-6 rounded-md flex flex-col justify-between h-36 w-48 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 hover:bg-gray-700 animate-fade-in">
              <div>
                <h2 className="text-xl font-bold text-center mb-4">
                  {blog.projectName}
                </h2>
                <p className="text-center">{blog.description}</p>
              </div>
            </div>
          </Link>
        ))
      ) : (
        <div className="text-gray-500 text-center w-full">
          No blogs found.
        </div>
      )}
    </div>
  );
};

export default UserBlogs;
