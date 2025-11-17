import React from 'react';
import Logo from '../../../components/Logo/Logo';
import { Link, NavLink } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import { MdOutlineArrowOutward } from "react-icons/md";

const Navbar = () => {

    const {user, signOutUser} = useAuth()

    const handleLogout = () => {
        signOutUser()
        .then(()=>{})
        .catch(err=>console.log(err))
    }

    const links = <>
    <NavLink className='ml-4 lg:ml-6' to="/">Home</NavLink>
    <NavLink className='ml-4 lg:ml-6' to="/coverage">Coverage</NavLink>
    <NavLink className='ml-4 lg:ml-6' to="/about-us">About Us</NavLink>
    <NavLink className='ml-4 lg:ml-6' to="/pricing">Pricing</NavLink>
    </>
    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {links}
                    </ul>
                </div>
                <Link to="/" className=" text-xl"><Logo /></Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}
                </ul>
            </div>
            <div className="navbar-end">
                {user ? (
                    <button onClick={handleLogout} className="btn btn-outline btn-secondary">Logout</button>
                ) : (
                    <Link to="/login" className="btn btn-outline btn-secondary">Login</Link>
                )}
                <Link to="/rider" className="btn ml-4  btn-primary text-black">Be a Rider <MdOutlineArrowOutward /> </Link>
            </div>
        </div>
    );
};

export default Navbar;