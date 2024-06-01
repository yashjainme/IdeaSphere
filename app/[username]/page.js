
// import { getServerSession } from 'next-auth';
// import { authOptions } from '@/app/api/auth/[...nextauth]/route';
// import { redirect } from 'next/navigation';
// import UserSpaceWrapper from '@/components/UserSpaceWrapper'; // Use a wrapper for UserSpace

// const UserPage = async ({ params }) => {
//   console.log('Hello This is username page.js');

//   const session = await getServerSession(authOptions);

//   if (!session) {
//     console.log('No session found, redirecting to sign-in');
//     return redirect('/api/auth/signin');
//   }

//   const email = session.user.email;
//   const username = email; // Assuming the username is the email for this example
  
//   // console.log(`Params username: ${params.username}`);
//   // console.log(`Session email: ${email}`);

 
   
//     // return redirect(`/${username}`);
    
//     return (
//       <div>
//       {/* <h1>User Page - {username}</h1> */}
//       <UserSpaceWrapper session={session} />
//     </div>
//   );

// };

// export default UserPage;





import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import UserSpaceWrapper from '@/components/UserSpaceWrapper';

const UserPage = async ({ params }) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect('/api/auth/signin');
  }

  const email = session.user.email;

  return (
    <div>
   
      <UserSpaceWrapper session={session} usernameParam={params.username} />
    </div>
  );
};

export default UserPage;
