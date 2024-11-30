import { Link } from 'react-router';
import useThemeStore from './ThemeStore';
import { FaSun, FaMoon, FaUser, FaCog, FaSignOutAlt} from 'react-icons/fa'

const Header = () => {

  return (
    <header>
      <nav>
        <Link to="/tasks">Tasks</Link>
        <Link to="/tasks">Track</Link>
        <Link to="/tasks">Statstics</Link>
      </nav>
       
    </header>
  )
}

export default Header