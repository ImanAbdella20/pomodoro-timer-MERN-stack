import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { doSignOut } from '../../firebase/auth';
import '../../index.css';
import { FaUserCircle } from 'react-icons/fa';

const Header: React.FC<{ user: any }> = ({ user }) => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [signedIn , setSignedIn] = useState(!!user)

  useEffect(() =>{
    setSignedIn(!!user);
  },[user])
  const handleSignOut = async () => {
    await doSignOut();
    setSignedIn(false);
    navigate('/category');
  };

  const handleDeleteAccount = () => {
    setDropdownOpen(false);
  }
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleNavigate = (path: string) => {
    setDropdownOpen(false); // Close dropdown
    navigate(path); // Navigate to the selected path
  };

  return (
    <div className='bg-gray-800'>
      <div className='w-full h-14 flex justify-between items-center px-96'>
        <div className='flex space-x-8'>
        <Link to="/track" className='text-white cursor-pointer nav-link'>Track</Link>
          <Link to="/about" className='text-white cursor-pointer nav-link'>About</Link>
          <Link to="/category" className='text-white cursor-pointer nav-link'>Tasks</Link>
          <Link to="/setting" className='text-white cursor-pointer nav-link'>Setting</Link>
          <Link to="/statistics" className='text-white cursor-pointer nav-link'>Statistics</Link>
        
        </div>
      
        <div className='relative'>
        { signedIn ? 
          ( <FaUserCircle
           className='text-white text-2xl cursor-pointer'
           onClick={toggleDropdown}
         />) : (
          <Link to="/login" className="text-white text-sm">Sign In</Link>
         )
      }
       
          {dropdownOpen && signedIn &&(
            <div className='absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50'>
              <button
                onClick={() => handleNavigate('/account')}
                
                className='block px-4 py-2 text-sm text-black hover:bg-gray-100 w-full text-left'
              >
                Account
              </button>
              <button
                onClick={handleSignOut}
                className='block px-4 py-2 text-sm text-black hover:bg-gray-100 w-full text-left'
              >
                Logout
              </button>

              <button
                onClick={handleDeleteAccount}
                className='block px-4 py-2 text-sm text-black hover:bg-gray-100 w-full text-left'
              >
                Delete Account
              </button>
            </div>
          )}
        </div>
      </div>
      <hr className='border-gray-700' />
    </div>
  );
};

export default Header;
