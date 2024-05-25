"use client";

import React, { useState, useEffect } from 'react';
import { signOut } from 'next-auth/react';
import CreateBlogModal from './CreateBlogModal';
import Link from 'next/link';

const UserSpace = ({ session }) => {
  const [isNewUser, setIsNewUser] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`/api/getUserData?email=${session.user.email}`);
        const userData = await response.json();
        setIsNewUser(Object.keys(userData).length === 0);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
    setUsername(session.user.email);
  }, [session.user.email]);

  const handleSignOut = async (e) => {
    e.preventDefault();
    try {
      await signOut({ callbackUrl: '/' });
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const handleCreateBlog = (projectName, randomId) => {
    const createBlogUrl = `/${username}/create-blog?projectName=${projectName}&randomId=${randomId}`;
    window.open(createBlogUrl, '_blank');
  };

  return (
    <div className="container mx-auto h-[85vh] p-4">
      <div className="flex justify-between items-center mb-4">
      <h1 className="text-2xl font-bold">
          {isNewUser ? 'Welcome' : 'Welcome back'}, {session.user.name}
        </h1>
        <button
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md "
          onClick={handleSignOut}
        >
          Sign Out
        </button>
      </div>
      <div className="bg-gray-200 p-8 rounded-lg flex h-full">
        <div className="flex space-x-4 ">
          <Link href={`/${username}/blogs`}>
            <div className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md flex items-center justify-cente h-48">
              Users previous blogs
            </div>
          </Link>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-black text-white px-4 py-2 rounded-md flex items-center justify-center h-48"
          >
            <span className="mr-2">+</span> Create New Blog
          </button>
        </div>
      </div>
      <CreateBlogModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreateBlog={handleCreateBlog}
      />
    </div>
  );
};

export default UserSpace;












