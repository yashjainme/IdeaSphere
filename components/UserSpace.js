
// import React, { useState, useEffect } from 'react';
// import { signOut } from 'next-auth/react';
// import CreateBlogModal from './CreateBlogModal';
// import Link from 'next/link';

// const UserSpace = ({ session }) => {
//   const [isNewUser, setIsNewUser] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [username, setUsername] = useState('');
//   const [dropdownOpen, setDropdownOpen] = useState(false);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const response = await fetch(`/api/getUserData?email=${session.user.email}`);
//         const userData = await response.json();
//         setIsNewUser(Object.keys(userData).length === 0);
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//       }
//     };

//     fetchUserData();
//     setUsername(session.user.email);
//   }, [session.user.email]);

//   const handleSignOut = async (e) => {
//     e.preventDefault();
//     try {
//       await signOut({ callbackUrl: '/' });
//     } catch (error) {
//       console.error('Sign out error:', error);
//     }
//   };

//   const handleDropdownToggle = () => {
//     setDropdownOpen(!dropdownOpen);
//   };

//   const handleCreateBlog = (projectName, randomId) => {
//     const createBlogUrl = `/${username}/create-blog?projectName=${projectName}&randomId=${randomId}`;
//     window.open(createBlogUrl, '_blank');
//   };

//   return (
//     <div className="container mx-auto h-[85vh] p-4">
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-2xl font-bold">
//           {isNewUser ? 'Welcome' : 'Welcome back'}, {session.user.name}
//         </h1>
//         <div className="relative">
//           <button
//             className="bg-gray-300 rounded-full h-10 w-10 overflow-hidden focus:outline-none"
//             onClick={handleDropdownToggle}
//           >
//             <img src={session.user.image} alt="User" className="h-full w-full object-cover" />
//           </button>
//           {dropdownOpen && (
//             <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
//               <div className="py-1">
//                 <button
//                   onClick={() => console.log('Settings clicked')} // Implement your settings logic here
//                   className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
//                 >
//                   Signed in as {session.user.email} 
//                 </button>
//                 <button
//                   onClick={() => console.log('Settings clicked')} // Implement your settings logic here
//                   className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
//                 >
//                   Settings
//                 </button>
//                 <button
//                   onClick={() => console.log('Invite a friend clicked')} // Implement your invite logic here
//                   className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
//                 >
//                   Invite a Friend
//                 </button>
//                 {/* Add more options here */}
//               </div>
//             </div>
//           )}
//         </div>

//       </div>
//       <div className="bg-gray-200 p-8 rounded-lg flex h-full">
//         <div className="flex space-x-4 ">
//           <Link className='h-fit' href={`/${username}/blogs`}>
//             <div className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md flex items-center justify-cente h-48">
//               Users previous blogs
//             </div>
//           </Link>
//           <button
//             onClick={() => setIsModalOpen(true)}
//             className="bg-black text-white px-4 py-2 rounded-md flex items-center justify-center h-48"
//           >
//             <span className="mr-2">+</span> Create New Blog
//           </button>
//         </div>
//       </div>
//       <CreateBlogModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         onCreateBlog={handleCreateBlog}
//       />
//     </div>
//   );
// };

// export default UserSpace;

































import React, { useState, useEffect } from 'react';
import { signOut } from 'next-auth/react';
import CreateBlogModal from './CreateBlogModal';
import Link from 'next/link';

const UserSpace = ({ session }) => {
  const [isNewUser, setIsNewUser] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [blogs, setBlogs] = useState([]);

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

    const fetchUserBlogs = async () => {
      try {
        const response = await fetch(`/api/getUserBlogs`);
        if (response.ok) {
          const blogsData = await response.json();
          setBlogs(blogsData);
        }
      } catch (error) {
        console.error('Error fetching user blogs:', error);
      }
    };

    fetchUserData();
    fetchUserBlogs();
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

  const handleCreateBlog = (projectName, randomId) => {
    const createBlogUrl = `/${username}/create-blog?projectName=${projectName}&randomId=${randomId}`;
    window.open(createBlogUrl, '_blank');
  };

  const truncateContent = (content, length = 100) => {
    if (content.length <= length) return content;
    return content.substring(0, length) + '...';
  };

  return (
    <div className="container mx-auto h-[85vh] p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">
          {isNewUser ? 'Welcome' : 'Welcome back'}, {session.user.name}
        </h1>
        <div className="relative">
          <button
            className="bg-gray-300 rounded-full h-10 w-10 overflow-hidden focus:outline-none"
            onClick={handleDropdownToggle}
          >
            <img src={session.user.image} alt="User" className="h-full w-full object-cover" />
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
              <div className="py-1">
                <button
                  onClick={() => console.log('User clicked')} // Implement your settings logic here
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  Signed in as {session.user.email}
                </button>
                <button
                  onClick={() => console.log('Settings clicked')} // Implement your settings logic here
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  Settings
                </button>
                <button
                  onClick={() => console.log('Invite a friend clicked')} // Implement your invite logic here
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  Invite a Friend
                </button>
                {/* Add more options here */}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="bg-gray-200 p-8 rounded-lg flex h-full flex-col">
        <div className="flex flex-wrap space-x-4 mb-4">
          
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <div key={blog._id} className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md flex flex-col justify-between h-48 w-52 mb-4">
                
                <div>
                  <h2 className="text-xl font-bold">{blog.projectName}</h2>
                  <p>{truncateContent(blog.content)}</p>
                </div>
                <Link target='_blank' href={`/${username}/blogs/${blog._id}`}>
                  Read more
                </Link>
              </div>
            ))
          ) : (
            <div className="text-gray-500">No blogs found.</div>
          )}
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-black text-white px-4 py-2 rounded-md flex items-center justify-center h-48 w-52 "
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
