"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import RichTextEditor from '@/components/RichTextEditor';
import { useSession } from 'next-auth/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image';

const EditBlogPage = () => {
  const router = useRouter();
  const { id, username } = useParams();
  const [blog, setBlog] = useState(null);
  const [content, setContent] = useState('');
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [coverImage, setCoverImage] = useState(null);
  const [coverImagePreview, setCoverImagePreview] = useState('');
  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchUserBlogs = async () => {
      if (!session || status === 'loading') return;

      try {
        const response = await fetch('/api/getUserBlogs');
        if (response.ok) {
          const blogs = await response.json();
          const currentBlog = blogs.find(blog => blog._id === id);
          if (currentBlog) {
            setBlog(currentBlog);
            setContent(currentBlog.content);
            setProjectName(currentBlog.projectName);
            setDescription(currentBlog.description);
            setCoverImagePreview(currentBlog.coverImageUrl);
          } else {
            toast.error('Blog not found');
          }
        } else {
          toast.error('Failed to load blogs');
        }
      } catch (error) {
        console.error('Error fetching blogs:', error);
        toast.error('An error occurred while fetching blogs');
      }
    };

    fetchUserBlogs();
  }, [id, session, status]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (!session || status === 'loading') {
      console.error('Session not available');
      return;
    }

    const formData = new FormData();
    formData.append('id', id);
    formData.append('projectName', projectName);
    formData.append('description', description);
    formData.append('content', content);
    formData.append('email', session.user.email);
    if (coverImage) {
      formData.append('coverImage', coverImage);
    }

    try {
      const res = await fetch('/api/updateBlog', {
        method: 'PUT',
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        toast.success(data.message);
        setTimeout(() => {
          router.push(`/${username}`);
        }, 1500);
      } else {
        const errorData = await res.json();
        toast.error(`Failed to update blog: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error updating blog:', error);
      toast.error('An error occurred while updating the blog');
    }
  };

  return (
    <div>
      <ToastContainer position="top-right" autoClose={1500} theme='dark' />
      <h1 className='text-center text-3xl'>Edit Blog</h1>
      <div className='m-4'>
        {blog ? (
          <>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="Project Name"
              className="w-full p-2 mb-4 border rounded"
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              className="w-full p-2 mb-4 border rounded"
            />
            <div className="mb-4">
              <label className="block mb-2">Cover Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full p-2 border rounded"
              />
              {coverImagePreview && (
                <Image 
                  src={coverImagePreview} 
                  alt="Cover preview" 
                  width={200} 
                  height={200} 
                  className="mt-2"
                />
              )}
            </div>
            <RichTextEditor value={content} onChange={setContent} />
            <button
              className='bg-black text-white px-4 py-2 rounded-md transition-colors duration-300 hover:bg-gray-300 hover:text-black w-20'
              onClick={handleSave}
            >
              Save
            </button>
          </>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};

export default EditBlogPage;