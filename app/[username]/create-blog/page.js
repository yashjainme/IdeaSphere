

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
  const description = searchParams.get('description');
  const randomId = searchParams.get('randomId');

  const [content, setContent] = useState('');
  const [coverImageFile, setCoverImageFile] = useState(null);
  const { data: session, status } = useSession();

  const handleSave = async () => {
    if (!session || status === 'loading') {
      console.error('Session not available');
      return;
    }

    const formData = new FormData();
    formData.append('projectName', projectName);
    formData.append('description', description);
    formData.append('randomId', randomId);
    formData.append('content', content);
    formData.append('userEmail', session.user.email);

    if (coverImageFile) {
      formData.append('coverImage', coverImageFile);
    }

    const res = await fetch('/api/createBlog', {
      method: 'POST',
      body: formData,
    });

    if (res.ok) {
      toast.success('Blog Saved');
      setTimeout(() => {
        router.push(`/${session.user.email}`);
      }, 1500);
    } else {
      toast.error('Failed to save blog');
    }
  };

  const handleCoverImageChange = (event) => {
    setCoverImageFile(event.target.files[0]);
  };

  return (
    <div>
      <ToastContainer position="top-right" autoClose={1500} theme='dark' />
      <h1 className='text-center text-3xl'>Create Blog - {projectName}</h1>
      <div className='m-4'>

      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black" htmlFor="file_input">
  Upload Cover Image
</label>
<input
  className="
    block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer
    bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600
    dark:placeholder-gray-400 p-2 mb-4
    file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0
    file:text-sm file:font-semibold
    file:bg-black file:text-white
    hover:file:bg-gray-700"
  id="file_input"
  type="file"
  accept="image/*"
  onChange={handleCoverImageChange}
/>
        <RichTextEditor value={content} onChange={setContent} />
        <button
          className='bg-black text-white px-4 py-2 rounded-md transition-colors duration-300 hover:bg-gray-300 hover:text-black w-20'
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default CreateBlogPage;










