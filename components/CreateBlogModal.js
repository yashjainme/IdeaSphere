import React, { useState } from 'react';

const CreateBlogModal = ({ isOpen, onClose, onCreateBlog }) => {
  const [projectName, setProjectName] = useState('');

  const handleCreateBlog = () => {
    const randomId = Math.random().toString(36).substr(2, 9); // Generate a random 9-character ID
    onCreateBlog(projectName, randomId);
    setProjectName('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-lg font-bold mb-4">Create New Blog</h2>
          <input
            type="text"
            placeholder="Project Name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 w-full mb-4"
          />
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md mr-2"
            >
              Cancel
            </button>
            <button
              onClick={handleCreateBlog}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBlogModal;