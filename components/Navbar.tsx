'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link'; 
import { FaSearch, FaUserCircle } from 'react-icons/fa'; 

const Navbar: React.FC = () => {
  const [showSearch, setShowSearch] = useState<boolean>(false);

  return (
    <nav className="bg-gray-800 p-4 fixed top-0 left-0 right-0 flex items-center justify-between z-50">
      <div className="flex items-center space-x-4">
        <Image
          src="https://image-resizer-cloud-api.akamaized.net/image/81A21D90-36C0-4C48-9256-7A06D1A7E907/0-3x1.jpg?width=2310&updatedTime=2024-08-24T12:16:35Z&dt=Web"
          alt="Logo"
          width={150}
          height={50}
          className="object-contain"
        />
        <ul className="flex space-x-4 text-white">
          <li>
            <Link href="/">Home</Link> 
          </li>
          <li>
            <Link href="/all-movies">Movies</Link>
          </li>
          <li>
            <Link href="/all-shows">Shows</Link> 
          </li>
        </ul>
      </div>
      <div className="flex items-center space-x-4 text-white">
        <button
          onClick={() => setShowSearch(!showSearch)}
          className="flex items-center space-x-1"
        >
          <FaSearch />
        </button>
        {showSearch && (
          <input
            type="text"
            placeholder="Search..."
            className="p-2 rounded bg-gray-700 text-white"
          />
        )}

        <Link href="/subscription" className="flex items-center space-x-1">
          <span>Subscription</span>
        </Link>
        <Link href="/sign-in" className="flex items-center space-x-1">
          <FaUserCircle />
          <span>Sign In</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
