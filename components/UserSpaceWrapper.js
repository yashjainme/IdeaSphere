

"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import UserSpace from './UserSpace';
import Link from 'next/link';
import Image from 'next/image';

const UserSpaceWrapper = ({ session, usernameParam }) => {
  const router = useRouter();
  const email = session.user.email;
  const decodedUsername = decodeURIComponent(usernameParam);

  const [userExists, setUserExists] = useState(null);
  const [otherUserBlogs, setOtherUserBlogs] = useState([]);

  useEffect(() => {
    const checkUserExists = async () => {
      if (decodedUsername !== email) {
        const response = await fetch(`/api/checkUser?username=${decodedUsername}`);
        if (response.ok) {
          const { exists } = await response.json();
          setUserExists(exists);
        } else {
          setUserExists(false);
        }
      } else {
        setUserExists(true);
      }
    };

    const fetchOtherUserBlogs = async () => {
      try {
        const response = await fetch(`/api/viewUser?email=${decodedUsername}`);
        const data = await response.json();
        setOtherUserBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchOtherUserBlogs();
    checkUserExists();
  }, [decodedUsername, email]);

  if (userExists === null) {
    return <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
    </div>;
  }

  if (userExists === false) {
    return <div className="flex justify-center items-center h-screen text-3xl font-bold text-gray-700">User Not Found</div>;
  }

  if (decodedUsername !== email) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">{`${decodedUsername}'s Blogs`}</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {otherUserBlogs.length > 0 ? (
            otherUserBlogs.map((blog) => (
              <Link
                key={blog._id}
                href={`/${decodedUsername}/blogs/${blog._id}`}
                
                className="block"
              >
                <div className="bg-white rounded-lg shadow-lg overflow-hidden transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
                  <div className="relative h-48">
                    {console.log(blog)}
                    <Image
                      src={blog.coverImageUrl || '/default-cover.jpg'}
                      alt={blog.projectName}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div className="p-4">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2 truncate">{blog.projectName}</h2>
                    <p className="text-gray-600 text-sm line-clamp-2">{blog.description}</p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center text-xl text-gray-500 py-12">
              No blogs found.
            </div>
          )}
        </div>
      </div>
    );
  }

  return <UserSpace session={session} />;
};

export default UserSpaceWrapper;










