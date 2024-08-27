import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { toast } from 'react-toastify';

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

  const handleDelete = async (blogId) => {
    try {
      const response = await fetch(`/api/deleteBlog`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ blogId }),
      });

      if (response.ok) {
        setBlogs(blogs.filter(blog => blog._id !== blogId));
        toast.success('Blog deleted successfully');
      } else {
        const errorData = await response.json();
        toast.error(`Failed to delete blog: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error deleting blog:', error);
      toast.error('An error occurred while deleting the blog');
    }
  };

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {blogs.length > 0 ? (
        blogs.map((blog) => (
          <div key={blog._id} className="relative group">
            <Link
              className="h-fit block"
              href={`/${username}/blogs/${blog._id}`}
              
            >
              <div className="bg-gray-900 text-white px-4 py-6 rounded-md flex flex-col justify-between h-36 w-48 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 hover:bg-gray-700 animate-fade-in">
                <div>
                  <h2 className="text-xl font-bold text-center mb-4">
                    {blog.projectName}
                  </h2>
                  <p className="text-center">
                    {blog.description.length > 30
                      ? `${blog.description.substring(0, 30)}...`
                      : blog.description}
                  </p>
                </div>
              </div>
            </Link>
            <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Link href={`${username}/edit-blog/${blog._id}`}>


                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500 cursor-pointer hover:text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </Link>
              <button onClick={() => handleDelete(blog._id)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500 cursor-pointer hover:text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
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




