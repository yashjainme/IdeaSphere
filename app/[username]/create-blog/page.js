

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
  const [isSaved, setIsSaved] = useState(false);

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

    setIsSaved(true);
    try{

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
    }catch (error) {
      console.error('Error updating blog:', error);
      toast.error('An error occurred while updating the blog');
    }finally {
      setIsSaved(false);
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
              className='bg-black text-white px-4 py-2 rounded-md transition-colors duration-300 hover:bg-gray-300 hover:text-black w-20 disabled:opacity-50 disabled:cursor-not-allowed'
              onClick={handleSave}
              disabled={isSaved}
            >
              {isSaved ? (
                <svg className="animate-spin h-5 w-5 text-white mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : 'Save'}
            </button>
      </div>
    </div>
  );
};

export default CreateBlogPage;










