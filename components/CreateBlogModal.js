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
    setDescription('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <ToastContainer position="top-right" autoClose={1500} theme="dark" />
      <div className="fixed z-10 inset-0 overflow-y-auto bg-black bg-opacity-50">
        <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <div className="inline-block align-bottom bg-gray-900 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div className="bg-gray-900 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <h3 className="text-2xl leading-6 font-bold text-white mb-4">
                Create New Blog
              </h3>
              <div className="mt-3 text-center sm:mt-0 sm:text-left">
                <div className="mt-2">
                  <input
                    type="text"
                    placeholder="Project Name"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm py-2 px-3 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                  />
                </div>
                <div className="mt-4">
                  <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows="3"
                    className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm py-2 px-3 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                  />
                </div>
              </div>
            </div>
            <div className="bg-gray-800 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                onClick={handleCreateBlog}
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-yellow-500 text-base font-medium text-black hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Create
              </button>
              <button
                onClick={onClose}
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-600 shadow-sm px-4 py-2 bg-gray-700 text-base font-medium text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateBlogModal;