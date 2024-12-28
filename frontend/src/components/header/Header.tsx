import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { doSignOut } from '../../firebase/auth';
import '../../index.css';
import { FaUserCircle } from 'react-icons/fa';

const Header: React.FC<{ user: any }> = ({ user }) => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleSignOut = async () => {
    await doSignOut();
    navigate('/login');
  };

  const handleDeleteAccount = () => {
    
  }
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className='bg-gray-800'>
      <div className='w-full h-14 flex justify-between items-center px-96'>
        <div className='flex space-x-8'>
          <Link to="/category" className='text-white cursor-pointer nav-link'>Tasks</Link>
          <Link to="/about" className='text-white cursor-pointer nav-link'>About</Link>
          <Link to="/track" className='text-white cursor-pointer nav-link'>Track</Link>
          <Link to="/setting" className='text-white cursor-pointer nav-link'>Setting</Link>
          <Link to="/statistics" className='text-white cursor-pointer nav-link'>Statistics</Link>
        </div>
        <div className='relative'>
          <FaUserCircle
            className='text-white text-2xl cursor-pointer'
            onClick={toggleDropdown}
          />
          {dropdownOpen && (
            <div className='absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50'>
              <button
                onClick={() => navigate('/account')}
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
