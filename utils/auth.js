// utils/auth.js
import { getSession } from 'next-auth/react';

export const getAuthSession = async () => {
  const session = await getSession();
  return session;
};
