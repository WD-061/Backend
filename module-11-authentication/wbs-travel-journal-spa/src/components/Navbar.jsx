import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Navbar = () => {
  const { user, logOut } = useAuth();

  return (
    <div className='navbar bg-base-100'>
      <div className='flex-1'>
        <Link to='/' className='btn btn-ghost text-xl'>
          Travel journal
          <span role='img' aria-labelledby='airplane'>
            🛫
          </span>
          <span role='img' aria-labelledby='heart'>
            ❤️
          </span>
        </Link>
      </div>
      <div className='flex-none'>
        <ul className='menu menu-horizontal px-1'>
          <li>
            <NavLink to='/'>Home</NavLink>
          </li>
          <li>
            <NavLink to='/create'>Create post</NavLink>
          </li>
          <li>
            {user ? (
              <span>{`Hi, ${user.firstName}`}</span>
            ) : (
              <NavLink to='/register'>Register</NavLink>
            )}
          </li>
          <li>
            {user ? (
              <span onClick={logOut}>Logout</span>
            ) : (
              <NavLink to='/login'>Login</NavLink>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
