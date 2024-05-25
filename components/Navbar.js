
"use client"
import Link from 'next/link';
import Image from 'next/image';
import IdeaImg from '../public/IdeaImg.png';
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut({ callbackUrl: '/' });
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <nav className="bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 p-0 m-0">
            <Link href="/">
              <Image
                src={IdeaImg}
                alt="IdeaSphere Logo"
                width={230}
                height={45}
                className="invert"
              />
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-6">
              {/* Home */}
              <Link href="/">
                <span className="text-white hover:text-gray-300 px-3 py-2 text-sm font-medium transition-colors duration-300 relative after:absolute after:left-0 after:bottom-0 after:bg-white after:h-0.5 after:w-full after:origin-bottom-right after:transition-transform after:duration-300 after:scale-x-0 hover:after:scale-x-100 cursor-pointer">
                  Home
                </span>
              </Link>

              {/* Create Blog */}
              <Link href="/create-blog">
                <span className="text-white hover:text-gray-300 px-3 py-2 text-sm font-medium transition-colors duration-300 relative after:absolute after:left-0 after:bottom-0 after:bg-white after:h-0.5 after:w-full after:origin-bottom-right after:transition-transform after:duration-300 after:scale-x-0 hover:after:scale-x-100 cursor-pointer">
                  Create Blog
                </span>
              </Link>

              {/* Organize Events */}
              <Link href="/organize-events">
                <span className="text-white hover:text-gray-300 px-3 py-2 text-sm font-medium transition-colors duration-300 relative after:absolute after:left-0 after:bottom-0 after:bg-white after:h-0.5 after:w-full after:origin-bottom-right after:transition-transform after:duration-300 after:scale-x-0 hover:after:scale-x-100 cursor-pointer">
                  Organize Events
                </span>
              </Link>

              {/* About Us */}
              <Link href="/about">
                <span className="text-white hover:text-gray-300 px-3 py-2 text-sm font-medium transition-colors duration-300 relative after:absolute after:left-0 after:bottom-0 after:bg-white after:h-0.5 after:w-full after:origin-bottom-right after:transition-transform after:duration-300 after:scale-x-0 hover:after:scale-x-100 cursor-pointer">
                  About Us
                </span>
              </Link>

              {/* Contacts */}
              <Link href="/contact">
                <span className="text-white hover:text-gray-300 px-3 py-2 text-sm font-medium transition-colors duration-300 relative after:absolute after:left-0 after:bottom-0 after:bg-white after:h-0.5 after:w-full after:origin-bottom-right after:transition-transform after:duration-300 after:scale-x-0 hover:after:scale-x-100 cursor-pointer">
                  Contact Us
                </span>
              </Link>

              {/* Sign In/Out */}
              {session ? (
                <button
                  className="bg-white text-black px-4 py-2 rounded-md transition-colors duration-300 hover:bg-gray-300 hover:text-black"
                  onClick={handleSignOut}
                >
                  Sign Out
                </button>
              ) : (
                <button
                  className="bg-white text-black px-4 py-2 rounded-md transition-colors duration-300 hover:bg-gray-300 hover:text-black"
                  onClick={() => signIn()}
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;