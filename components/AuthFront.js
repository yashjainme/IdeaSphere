"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function AuthFront() {
  const { data: session } = useSession();
  if (session) {
    return (
      <div className="container w-1/3 mt-32 bg-slate-600 p-32 rounded-lg mx-auto">
        Signed in as {session.user.email} <br />
        <button className="border-2 p-3 border-white" onClick={() => signOut()}>Sign out</button>
      </div>
    );
  }
  return (
    <div className="container w-1/3 mt-32 bg-slate-600 p-32 rounded-lg mx-auto">
      Not signed in
      <button className="border-2 p-3 border-white rounded-md mx-4" onClick={() => signIn("google")}>Sign in with Google</button>
    </div>
  );
}
