import { Link } from 'react-router-dom';
import { FaSun, FaMoon, FaUser, FaCog, FaSignOutAlt} from 'react-icons/fa'
import { Dispatch, SetStateAction } from 'react';
import edu from '../../assets/edu.gif'

interface themeType{
  theme: string; 
  setTheme: Dispatch<SetStateAction<string>>
}

const Header: React.FC<themeType> = ({theme , setTheme}) => {

const toggleIcon = () =>{
  theme 
}

  return (
    <div className='w-svw h-14 bg-customGreen pt-4 justify-between'>
      <div className='text-center '>
      <Link to="/tasks" className='text-white mr-12 cursor-pointer relative nav-link'>Tasks</Link>
      <Link to="/track" className='text-white mr-12 cursor-pointer relative nav-link'>Track</Link>
      <Link to="" className='text-white mr-12 cursor-pointer relative nav-link'>Statstics</Link>
      </div>

      <i className=''></i>
      
    </div>
  )
}

export default Header