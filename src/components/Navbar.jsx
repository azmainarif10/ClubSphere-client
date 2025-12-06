import React, { use } from 'react';
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {

  const {user,logOut} = use(AuthContext)


    return (
        <div>
             <div className="navbar bg-base-100 shadow-sm sticky top-0 z-50">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow">
        
            <li><Link to="/">Home</Link></li>
            
         
      </ul>
    </div>
    <a className="btn btn-ghost text-xl">daisyUI</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
          <li><Link to="/">Home</Link></li>
          
    </ul>
  </div>
  <div className="navbar-end">
     
         
     
          {user ? (
                 <div className="dropdown dropdown-end mr-4">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                    <div className="tooltip tooltip-bottom" data-tip={user.displayName || "User Name"}>
                  <img className="h-10 w-10 rounded-full object-cover" src={user.photoURL} />
                </div>
                </div>
            </div>
            <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
                <li><Link to="/dashboard/profile">Profile</Link></li>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><a onClick={logOut}>Logout</a></li>
            </ul>
        </div>
              ) : (
                <div className='flex gap-3 mr-4'>
                  <NavLink to="/login" className="btn rounded-xl  bg-blue-300 text-white">
                    Login
                  </NavLink>

                  <NavLink to="/register" className="btn rounded-xl bg-blue-300 text-white">
                    Sign Up
                  </NavLink>
                </div>
              )}

  </div>
</div>
        </div>
    );
};

export default Navbar;