"use client";
import { useSession, signIn, signOut } from "next-auth/react";

export default function AuthFront() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="container max-w-md mt-32 bg-gradient-to-r from-gray-800 via-gray-900 to-black p-8 rounded-lg mx-auto shadow-lg">
        <h1 className="text-white text-2xl font-semibold mb-6">Welcome to IdeaSphere</h1>
        <p className="text-white mb-6">Signed in as {session.user.email}</p>
        <button
          className="w-full bg-yellow-500 text-black px-4 py-2 rounded-md transition-colors duration-300 hover:bg-yellow-600 hover:text-white font-semibold"
          onClick={() => signOut()}
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <div className="container max-w-md mt-32 bg-gradient-to-r from-gray-800 via-gray-900 to-black p-8 rounded-lg mx-auto shadow-lg">
      <h1 className="text-white text-3xl font-bold mb-4">Join IdeaSphere</h1>
      <h2 className="text-yellow-400 text-xl font-semibold mb-6">Where Ideas Take Flight</h2>
      <p className="text-gray-300 mb-6">
        Unlock a world of creativity and collaboration. Sign in to:
      </p>
      <ul className="text-white mb-8 list-disc list-inside">
        <li className="mb-2">Create and share inspiring blogs</li>
        <li className="mb-2">Organize thought-provoking events</li>
        <li className="mb-2">Connect with like-minded thinkers</li>
        <li>Be part of a vibrant community of innovators</li>
      </ul>
      <button
        className="w-full bg-yellow-500 text-black px-4 py-3 rounded-md transition-colors duration-300 hover:bg-yellow-600 hover:text-white font-semibold text-lg"
        onClick={() => signIn("google")}
      >
        Sign In with Google to Get Started
      </button>
    </div>
  );
}