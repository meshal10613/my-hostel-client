import React, { useState } from 'react';
import { AiOutlineCalendar } from 'react-icons/ai';
import { CiLogout } from 'react-icons/ci';
import { FaCreditCard, FaRegComments, FaUsers, FaUtensils } from 'react-icons/fa';
import { GiChefToque, GiHotMeal } from 'react-icons/gi';
import { MdFastfood, MdPerson, MdRateReview } from 'react-icons/md';
import { Link, NavLink, Outlet } from 'react-router';
import Swal from 'sweetalert2';
import useAuthContext from '../Hooks/useAuthContext';

const DashboardLayout = () => {
    const { logOut } = useAuthContext();
    const [dash, setDash] = useState("My Profile");

    const handleLogout = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You will be logged out!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#FF4D00",
            cancelButtonColor: "#1F3A93",
            confirmButtonText: "Yes, Logout!"
            }).then((result) => {
            if (result.isConfirmed) {
                logOut()
                .then(() => {
                    Swal.fire({
                        title: "Congratulations!",
                        text: "You have successfully logged out",
                        icon: "success",
                        confirmButtonColor: "#FF4D00"
                    });
                })
                .catch((error) => {
                    Swal.fire({
                        title: "Sorry!",
                        text: `${error.message}`,
                        icon: "error",
                        confirmButtonColor: "#FF4D00"
                    });
                })
            }
        });
    };

    return (
    <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
        {/* Navbar */}
            <div className="navbar bg-base-300 w-full lg:hidden">
                <div className="flex-none">
                    <label htmlFor="my-drawer-2" aria-label="open sidebar" className="btn btn-square btn-ghost">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="inline-block h-6 w-6 stroke-current"
                    >
                        <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"
                        ></path>
                    </svg>
                    </label>
                </div>
                <div className="mx-2 flex-1 px-2 md:hidden">{dash}</div>
            </div>
            {/* page content here */}
            {/* <Outlet/> */}
        </div>
        <div className="drawer-side">
            <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
            <div className='menu bg-base-200 text-base-content min-h-full w-64 2xl:w-80 flex flex-col justify-between p-4 '>
                <ul className="dashlink">
                    {/* <Logo/> */}
                    <Link to="/" className='cursor-pointer flex items-center justify-center gap-3 hover:bg-base-300 rounded-xl'>
                        <img src="/my-hostel-logo.png" alt="" className='w-13' />
                        <h2 className='text-2xl font-semibold'>My Hostel</h2>
                    </Link>
                    {/* Sidebar content here */}
                    <li>
                        <NavLink to="/dashboard/my-profile" onClick={() => setDash("My Profile")}>
                            <MdPerson className="inline-block mr-2" />
                            My Profile
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/requested-meals" onClick={() => setDash("My Reviews")}>
                            <FaUtensils className="inline-block mr-2" />
                            Requested Meals
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/my-reviews" onClick={() => setDash("My Reviews")}>
                            <MdRateReview className="inline-block mr-2" />
                            My Reviews
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/payment-history" onClick={() => setDash("My Reviews")}>
                            <FaCreditCard className="inline-block mr-2" />
                            Payment History
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/manage-reviews" onClick={() => setDash("My Reviews")}>
                            <FaUsers className="inline-block mr-2" />
                            Manage Users
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/add-meal" onClick={() => setDash("My Reviews")}>
                            <GiHotMeal className="inline-block mr-2" />
                            Add Meal
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/all-meals" onClick={() => setDash("My Reviews")}>
                            <MdFastfood  className="inline-block mr-2" />
                            All Meals
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/all-reviews" onClick={() => setDash("My Reviews")}>
                            <FaRegComments className="inline-block mr-2" />
                            All Reviews
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/serve-meals" onClick={() => setDash("My Reviews")}>
                            <GiChefToque className="inline-block mr-2" />
                            Serve Meals
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/upcoming-meals" onClick={() => setDash("My Reviews")}>
                            <AiOutlineCalendar className="inline-block mr-2" />
                            Upcoming Meals
                        </NavLink>
                    </li>
                </ul>
                <button onClick={handleLogout} className='btn bg-[#FF4D00] text-white'><CiLogout />Logout</button>
            </div>
        </div>
    </div>
    );
};

export default DashboardLayout;