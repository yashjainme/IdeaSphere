







'use client';
import React, { useEffect, useState } from 'react';
import BlogCard from './BlogCard';

const AllBlogs = () => {
  const [allBlogs, setAllBlogs] = useState([]);

  useEffect(() => {
    const getAllBlogs = async () => {
      try {
        let response = await fetch('api/getAllBlogs');
        let data = await response.json();
        setAllBlogs(data);
      } catch (error) {
        console.log(error);
      }
    };

    getAllBlogs();
  }, []);

  return (
    <div className="container mx-auto p-4">
      {allBlogs.length > 0 ? (
        <div className="flex flex-wrap -mx-4">
          {allBlogs.map((blog, index) => (
            <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
              <BlogCard
                imageUrl={blog.coverImageUrl}
                description={blog.description}
                title={blog.projectName}
                blogId={blog._id}
                username={blog.email}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-gray-500 text-center w-full">
          No blogs found.
        </div>
      )}
    </div>
  );
};

export default AllBlogs;
