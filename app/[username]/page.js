
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import UserSpaceWrapper from '@/components/UserSpaceWrapper';
import { redirect } from 'next/navigation';

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
