import React, { useEffect, useRef, useState } from 'react';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { Link, NavLink } from 'react-router';
import Swal from 'sweetalert2';

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef();
    const links = <>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/meals">Meals</NavLink></li>
        <li><NavLink to="/upcomingMels">Upcoming Meals</NavLink></li>
    </>;

    // Close dropdown if clicked outside
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
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#FF4D00",
            cancelButtonColor: "#1F3A93",
            confirmButtonText: "Yes, delete it!"
            }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success",
                    confirmButtonColor: "#FF4D00"
                });
            }
        });
    };

    return (
    <div className="navbar bg-white">
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
            <a className="btn btn-ghost text-xl">daisyUI</a>
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
            <Link className="btn bg-[#FF4D00] text-white">Join Us</Link>
            <div className="relative inline-block text-left" ref={dropdownRef}>
                {/* Avatar Button */}
                <button
                    onClick={() => setOpen(!open)}
                    className="btn btn-ghost btn-circle avatar"
                >
                    <div className="w-10 rounded-full">
                    <img
                        src="https://i.pravatar.cc/100"
                        alt="Profile"
                    />
                    </div>
                </button>

                {/* Dropdown Menu */}
                {open && (
                    <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 mx-auto absolute right-0">
                        <li><Link className='hover:text-white hover:bg-[#FF4D00] cursor-auto'>Meshal</Link></li>
                        <li><Link className='hover:text-white hover:bg-[#FF4D00]'>Dashboard</Link></li>
                        <li><Link onClick={handleLogout} className='hover:text-white hover:bg-[#FF4D00]'>Logout</Link></li>
                    </ul>
                )}
            </div>
        </div>
    </div>
    );
};

export default Navbar;