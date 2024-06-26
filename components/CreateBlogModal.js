import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateBlogModal = ({ isOpen, onClose, onCreateBlog }) => {
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');

  const handleCreateBlog = () => {
    if (!projectName || projectName.trim() === '') {
      toast.error('Project name is required');
      return;
    }

    const randomId = Math.random().toString(36);
    onCreateBlog(projectName, description, randomId);
    setProjectName('');
    setDescription(''); // Reset the description field
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <ToastContainer position="top-right" autoClose={1500} theme="dark" />
      <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen">
          <div className="bg-black rounded-lg shadow-lg p-6">
            <h2 className="text-lg font-bold mb-4 text-white">Create New Blog</h2>
            <input
              type="text"
              placeholder="Project Name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="border border-gray-500 rounded-md px-3 py-2 w-full mb-4 bg-black text-white"
            />
            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border border-gray-500 rounded-md px-3 py-2 w-full mb-4 bg-black text-white"
            />
            <div className="flex justify-end">
              <button
                onClick={onClose}
                className="bg-gray-800 text-white px-4 py-2 rounded-md mr-2 transition-colors duration-300 hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateBlog}
                className="bg-white text-black px-4 py-2 rounded-md transition-colors duration-300 hover:bg-gray-300 hover:text-black"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateBlogModal;
