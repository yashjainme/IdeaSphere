// "use client";
// import { useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import UserSpace from './UserSpace';

// const UserSpaceWrapper = ({ session, usernameParam }) => {
//   const router = useRouter();
//   const email = session.user.email;
//   const decodedUsername = decodeURIComponent(usernameParam);

//   useEffect(() => {
//     if (decodedUsername !== email) {
//       router.push(`/${decodeURIComponent(email)}`);
//     }
//   }, [decodedUsername, email, router]);

//   if (decodedUsername !== email) {
//     return null; // Prevent rendering if the username doesn't match yet
//   }

//   return <UserSpace session={session} />;
// };

// export default UserSpaceWrapper;












"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import UserSpace from './UserSpace';

const UserSpaceWrapper = ({ session, usernameParam }) => {
  const router = useRouter();
  const email = session.user.email;
  const decodedUsername = decodeURIComponent(usernameParam);

  const [userExists, setUserExists] = useState(null);

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
    return <div>Preview of {decodedUsername}'s blogs</div>;
  }

  return <UserSpace session={session} />;
};

export default UserSpaceWrapper;

