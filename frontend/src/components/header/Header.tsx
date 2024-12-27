import { Link, useNavigate } from 'react-router-dom';
import React from 'react';
import { doSignOut } from '../../firebase/auth';
import '../../index.css';

const Header: React.FC<{ user: any }> = ({ user }) => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await doSignOut();
    navigate('/category');
  };

  return (
    <div className=''>
      <div className='w-svw h-14 pt-4 justify-between'>
        <div className='text-center'>
          <Link to="/category" className='text-white mr-12 cursor-pointer relative nav-link'>Tasks</Link>
          <Link to="/about" className='text-white mr-12 cursor-pointer relative nav-link'>About</Link>
          <Link to="/track" className='text-white mr-12 cursor-pointer relative nav-link'>Track</Link>
          <Link to="/statistics" className='text-white mr-12 cursor-pointer relative nav-link'>Statistics</Link>

          {user ? (
            <span className='text-white mr-12 cursor-pointer relative nav-link' onClick={handleSignOut}>Sign Out</span>
          ) : (
            <Link to="/login" className='text-white mr-12 cursor-pointer relative nav-link'>Sign In</Link>
          )}
        </div>
        <hr className='m-4' />
      </div>
    </div>
  );
};

export default Header;
