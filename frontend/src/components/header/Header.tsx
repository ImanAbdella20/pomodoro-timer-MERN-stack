import { Link } from 'react-router-dom';
import { FaSun, FaMoon, FaUser, FaTasks, FaSignOutAlt} from 'react-icons/fa'
import { Dispatch, SetStateAction } from 'react';
import edu from '../../assets/edu.gif'


const Header = () => {
  
  return (
    <div className='w-svw h-14  pt-4 justify-between'>
      <div className='text-center '>
      <Link to="/category" className='text-white mr-12 cursor-pointer relative nav-link'>Category</Link>
      <Link to="/tasks" className='text-white mr-12 cursor-pointer relative nav-link'>Tasks</Link>
      <Link to="/track" className='text-white mr-12 cursor-pointer relative nav-link'>Track</Link>
      <Link to="" className='text-white mr-12 cursor-pointer relative nav-link'>Statstics</Link>
      </div>

      <i className=''></i>
      
    </div>
  )
}

export default Header