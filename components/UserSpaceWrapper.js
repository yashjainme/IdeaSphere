
"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import UserSpace from './UserSpace';
import Link  from 'next/link';



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

   

    const fetchOtherUserBlogs = async () =>{
      try {
        const response = await fetch(`/api/viewUser?email=${decodedUsername}`)
        const data = await response.json()

        // console.log(data)
        setOtherUserBlogs(data)
      } catch (error) {
        
      }
    }

    fetchOtherUserBlogs()
    checkUserExists();
  }, [decodedUsername, email]);

  if (userExists === null) {
    return <div>Loading...</div>; // Or a loading spinner
  }

  if (userExists === false) {
    return <div>Not Found</div>; // Or use Next.js's 404 page
  }

  if (decodedUsername !== email) {
    // Render preview of other user's blogs
    return <div>{`Preview of ${decodedUsername}\u2019s blogs`}
      <div className="flex flex-wrap justify-center gap-4">
      {otherUserBlogs.length > 0 ? (
        otherUserBlogs.map((blog) => (
          <Link
            className="h-fit"
            key={blog._id}
            target="_blank"
            href={`/${decodedUsername}/blogs/${blog._id}`}
          >
            <div className="bg-gray-800 text-white px-4 py-6 rounded-md flex flex-col justify-between h-36 w-48 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 hover:bg-gray-700 animate-fade-in">
              <div>
                <h2 className="text-xl font-bold text-center mb-4">
                  {blog.projectName}
                </h2>
                <p className="text-center">{blog.description}</p>
              </div>
            </div>
          </Link>
        ))
      ) : (
        <div className="text-gray-500 text-center w-full">
          No blogs found.
        </div>
      )}
    </div>
    </div>;
  }

  return <UserSpace session={session} />;
};

export default UserSpaceWrapper;





























