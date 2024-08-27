

import React, { useState, useEffect } from 'react';
import { signOut } from 'next-auth/react';
import CreateBlogModal from './CreateBlogModal';
import UserBlogs from './UserBlogs';

const UserSpace = ({ session }) => {
  const [isNewUser, setIsNewUser] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);

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

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleCreateBlog = (projectName, description, randomId) => {
    const createBlogUrl = `/${username}/create-blog?projectName=${projectName}&description=${description}&randomId=${randomId}`;
    window.open(createBlogUrl, '_blank');
  };

  return (
    <div className="container mx-auto min-h-screen p-4 bg-gray-100">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 animate-fade-in">
          
          {isNewUser ? "Welcome" : "Welcome back"}, {session.user.name}
        </h1>
        <div className="relative">
          <button
            className="bg-gray-300 rounded-full h-12 w-12 overflow-hidden focus:outline-none transition duration-300 ease-in-out transform hover:scale-110"
            onClick={handleDropdownToggle}
          >
            <img src={session.user.image} alt="User" className="h-full w-full object-cover" />
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 animate-fade-in">
              <div className="py-1">
                <button
                  onClick={() => console.log('User clicked')}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  Signed in as {session.user.email}
                </button>
                <button
                  onClick={() => console.log('Settings clicked')}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  Settings
                </button>
                <button
                  onClick={() => console.log('Invite a friend clicked')}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  Invite a Friend
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="bg-gray-800 p-8 rounded-lg shadow-md flex flex-col h-full">
        <div className="flex flex-wrap justify-center gap-4">
          <UserBlogs username={username} />
          <button
  onClick={() => setIsModalOpen(true)}
  className="bg-yellow-500 text-black px-4 py-2 rounded-md flex flex-col items-center justify-center h-36 w-48 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
>
  <span className="text-3xl mb-2">+</span>
  <span className="text-lg font-semibold">Create New Blog</span>
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












































