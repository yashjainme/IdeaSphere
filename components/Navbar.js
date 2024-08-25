
"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import IdeaImg from '../public/IdeaImg.png';
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsTablet(window.innerWidth >= 768 && window.innerWidth <= 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut({ callbackUrl: '/' });
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-gray-800 via-gray-900 to-black shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <Image
                src={IdeaImg}
                alt="IdeaSphere Logo"
                width={180}
                height={35}
                className="invert"
                priority
              />
            </Link>
          </div>

          {/* Navigation Links for Desktop and Tablet */}
          <div className={`hidden ${isTablet ? 'lg:flex' : 'md:flex'} items-center space-x-4`}>
            <Link href="/">
              <span className="text-white hover:text-yellow-400 px-2 py-1 text-base font-semibold transition-colors duration-300 relative group">
                Home
                <span className="absolute inset-x-0 bottom-0 h-1 bg-yellow-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </span>
            </Link>
            <Link href="/create-blog">
              <span className="text-white hover:text-yellow-400 px-2 py-1 text-base font-semibold transition-colors duration-300 relative group">
                Create Blog
                <span className="absolute inset-x-0 bottom-0 h-1 bg-yellow-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </span>
            </Link>
            <Link href="/organize-events">
              <span className="text-white hover:text-yellow-400 px-2 py-1 text-base font-semibold transition-colors duration-300 relative group">
                Organize Events
                <span className="absolute inset-x-0 bottom-0 h-1 bg-yellow-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </span>
            </Link>
            <Link href="/about">
              <span className="text-white hover:text-yellow-400 px-2 py-1 text-base font-semibold transition-colors duration-300 relative group">
                About Us
                <span className="absolute inset-x-0 bottom-0 h-1 bg-yellow-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </span>
            </Link>
            <Link href="/contact">
              <span className="text-white hover:text-yellow-400 px-2 py-1 text-base font-semibold transition-colors duration-300 relative group">
                Contact Us
                <span className="absolute inset-x-0 bottom-0 h-1 bg-yellow-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </span>
            </Link>
            {session ? (
              <button
                className="bg-yellow-500 text-black px-3 py-1 text-sm rounded-md transition-colors duration-300 hover:bg-yellow-600 hover:text-white"
                onClick={handleSignOut}
              >
                Sign Out
              </button>
            ) : (
              <button
                className="bg-yellow-500 text-black px-3 py-1 text-sm rounded-md transition-colors duration-300 hover:bg-yellow-600 hover:text-white"
                onClick={() => signIn()}
              >
                Sign In
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className={`${isTablet ? 'lg:hidden' : 'md:hidden'} flex items-center`}>
            <button onClick={toggleMobileMenu} className="text-white focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className={`${isTablet ? 'lg:hidden' : 'md:hidden'} bg-gray-900 text-white py-2 px-4`}>
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
            <span className="block py-2 text-lg font-semibold hover:bg-gray-700 rounded transition-colors duration-300">Home</span>
          </Link>
          <Link href="/create-blog" onClick={() => setIsMobileMenuOpen(false)}>
            <span className="block py-2 text-lg font-semibold hover:bg-gray-700 rounded transition-colors duration-300">Create Blog</span>
          </Link>
          <Link href="/organize-events" onClick={() => setIsMobileMenuOpen(false)}>
            <span className="block py-2 text-lg font-semibold hover:bg-gray-700 rounded transition-colors duration-300">Organize Events</span>
          </Link>
          <Link href="/about" onClick={() => setIsMobileMenuOpen(false)}>
            <span className="block py-2 text-lg font-semibold hover:bg-gray-700 rounded transition-colors duration-300">About Us</span>
          </Link>
          <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
            <span className="block py-2 text-lg font-semibold hover:bg-gray-700 rounded transition-colors duration-300">Contact Us</span>
          </Link>
          {session ? (
            <button
              className="w-full bg-yellow-500 text-black py-2 rounded-md transition-colors duration-300 hover:bg-yellow-600 hover:text-white"
              onClick={handleSignOut}
            >
              Sign Out
            </button>
          ) : (
            <button
              className="w-full bg-yellow-500 text-black py-2 rounded-md transition-colors duration-300 hover:bg-yellow-600 hover:text-white"
              onClick={() => signIn()}
            >
              Sign In
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;