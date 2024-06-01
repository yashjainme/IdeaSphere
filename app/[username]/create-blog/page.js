
"use client"

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import RichTextEditor from '@/components/RichTextEditor';
import { useSession } from 'next-auth/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateBlogPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const projectName = searchParams.get('projectName');
  const randomId = searchParams.get('randomId');

  const [content, setContent] = useState('');
  const { data: session, status } = useSession(); // Access the session data

  const handleSave = async () => {
    if (!session || status === 'loading') {
      // Handle case where session is not available or still loading
      console.error('Session not available');
      return;
    }

    const res = await fetch('/api/createBlog', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        projectName,
        randomId,
        content,
        userEmail: session.user.email, // Include user's email in the request
      }),
    });

    if (res.ok) {
      // Handle success (e.g., redirect to a route based on user's email)
      toast.success('Blog Saved'); // Show success toast

      setTimeout(() => {
      router.push(`/${session.user.email}`);
    }, 1500); // Adjust the delay time as needed
    } else {
      console.error('Failed to save blog');
    }
  };

  return (
    <div>
      <ToastContainer 
      position="top-right"
      autoClose={1500}
      theme='dark'
      /> {/* Add ToastContainer at the top of your component */}
      <h1 className='text-center text-3xl'>Create Blog - {projectName}</h1>
      <div className='m-4'>
        <RichTextEditor value={content} onChange={setContent} />
        <button className='bg-black text-white px-4 py-2 rounded-md transition-colors duration-300 hover:bg-gray-300 hover:text-black w-20' onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default CreateBlogPage;
