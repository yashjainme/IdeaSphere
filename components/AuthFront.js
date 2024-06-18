
"use client";
import { useSession, signIn, signOut } from "next-auth/react";

export default function AuthFront() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="container w-1/3 mt-32 bg-black p-32 rounded-lg mx-auto">
       
        <p className="text-white mb-4">Signed in as {session.user.email}</p>
        <button
          className="bg-white text-black px-4 py-2 rounded-md transition-colors duration-300 hover:bg-gray-300 hover:text-black"
          onClick={() => signOut()}
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <div className="container w-1/3 mt-32 bg-black p-32 rounded-lg mx-auto flex flex-col">
       <h1 className=" text-white text-2xl text-nowrap mb-4  ">Welcome to IdeaSphere </h1>
      {/* <p className="text-white mb-4">Not signed in</p> */}
      <button
        className="bg-white text-black px-4 py-2 rounded-md transition-colors duration-300 hover:bg-gray-300 hover:text-black"
        onClick={() => signIn("google")}
      >
        Sign In with Google
      </button>
    </div>
  );
}