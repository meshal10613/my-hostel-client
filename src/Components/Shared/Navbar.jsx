import React, { useEffect, useRef, useState } from 'react';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { Link, NavLink } from 'react-router';
import Swal from 'sweetalert2';
import useAuthContext from '../../Hooks/useAuthContext';

const Navbar = () => {
    const { user, logOut } = useAuthContext();
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef();
    const links = <>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/meals">Meals</NavLink></li>
        <li><NavLink to="/upcomingMeals">Upcoming Meals</NavLink></li>
    </>;

    useEffect(() => {
        const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setOpen(false);
        }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You will be logged out!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#FFAE00",
            cancelButtonColor: "red",
            confirmButtonText: "Yes, Logout!"
            }).then((result) => {
            if (result.isConfirmed) {
                logOut()
                .then(() => {
                    Swal.fire({
                        title: "Congratulations!",
                        text: "You have successfully logged out",
                        icon: "success",
                        confirmButtonColor: "#FFAE00"
                    });
                })
                .catch((error) => {
                    Swal.fire({
                        title: "Sorry!",
                        text: `${error.message}`,
                        icon: "error",
                        confirmButtonColor: "#FFAE00"
                    });
                })
            }
        });
    };
     //bg-secondary
    return (
    <div className="navbar px-0 2xl:px-[7%] pr-1 md:pr-0">
        <div className="navbar-start">
            <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
            </div>
                <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {links}
                </ul>
            </div>
            <Link to="/" className='cursor-pointer flex items-center gap-2'>
                <img src="/logo.png" alt="" className='w-10' />
                <h2 className='text-2xl font-bold text-[#F17228]'>food<span className='text-[#FFB30E]'>wagon</span></h2>
            </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 gap-1">
                {links}
            </ul>
        </div>
        <div className="navbar-end items-center">
            <div className='w-8 h-8 rounded-full flex items-center justify-center cursor-pointer relative'>
                <span className='absolute text-[#FF4D00] -top-2 right-1'>1</span>
                <IoIosNotificationsOutline size={25} className='text-[#FF4D00]'/>
            </div>
            {
                user ?
                <div className="relative inline-block text-left" ref={dropdownRef}>
                    {/* Avatar Button */}
                    <button
                        onClick={() => setOpen(!open)}
                        className="btn btn-ghost btn-circle avatar"
                    >
                        <div className="w-10 rounded-full">
                            <img
                                src={user?.photoURL} //https://i.pravatar.cc/100
                                referrerPolicy='no-referrer'
                                alt={user?.displayName}
                            />
                        </div>
                    </button>

                    {/* Dropdown Menu */}
                    {open && (
                        <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 mx-auto absolute right-0">
                            <li><Link className='hover:text-white hover:bg-gradient-to-r from-[#FFAE00] to-[#FF8A00] cursor-auto'>{user?.displayName}</Link></li>
                            <li><Link to="/dashboard/my-profile" className='hover:text-white hover:bg-gradient-to-r from-[#FFAE00] to-[#FF8A00]'>Dashboard</Link></li>
                            <li><Link onClick={handleLogout} className='hover:text-white hover:bg-gradient-to-r from-[#FFAE00] to-[#FF8A00]'>Logout</Link></li>
                        </ul>
                    )}
                </div>
                :
                <Link to="/auth" className="btn bg-gradient-to-r from-[#FFAE00] to-[#FF8A00] text-white">Join Us</Link>
            }
        </div>
    </div>
    );
};

export default Navbar;