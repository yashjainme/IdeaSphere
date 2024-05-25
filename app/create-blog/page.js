
'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import AuthFront from '@/components/AuthFront';

const CreateBlogPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated' && session) {
      const email = session.user.email;
      router.push(`/${email}`);
    }
  }, [session, status, router]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <AuthFront />;
  }

  return null;
};

export default CreateBlogPage;


