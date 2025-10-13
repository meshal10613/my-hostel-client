import React from 'react';
import { AiOutlineCalendar } from 'react-icons/ai';
import { CiLogout } from 'react-icons/ci';
import { FaCreditCard, FaRegComments, FaUsers, FaUtensils } from 'react-icons/fa';
import { GiChefToque, GiHotMeal } from 'react-icons/gi';
import { MdFastfood, MdPerson, MdRateReview } from 'react-icons/md';
import { Link, NavLink, Outlet, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import useAuthContext from '../Hooks/useAuthContext';
import { Helmet } from 'react-helmet';

const DashboardLayout = () => {
    const { logOut, user } = useAuthContext();
    const navigate = useNavigate();

    if(!user){
        return navigate("/");
    };

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
                    navigate("/");
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

    return (
    <div className="drawer lg:drawer-open">
        <Helmet>
            <title>Dashboard</title>
        </Helmet>
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
        {/* Navbar */}
            <div className="navbar justify-between items-center bg-base-200 w-full lg:hidden">
                <div className='flex items-center'>
                    <div className="flex-none lg:hidden">
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
                    <div className="mx-1 flex-1 text-xl font-semibold">{user?.displayName}</div>
                </div>
                <Link to="/dashboard/my-profile" className="w-10 h-10 rounded-full">
                    <img 
                        src={user?.photoURL} 
                        alt={user?.displayName}
                        referrerPolicy='no-referrer'
                        className='w-10 h-10 rounded-full'/>
                </Link>
            </div>
            {/* page content here */}
            <Outlet/>
        </div>
        <div className="drawer-side">
            <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
            <div className='menu bg-base-200 text-base-content min-h-full w-64 2xl:w-80 flex flex-col justify-between py-4 pl-4 pr-0'>
                <ul className="dashlink">
                    {/* <Logo/> */}
                    <Link to="/" className='cursor-pointer flex items-center justify-center gap-2 py-3'>
                        <img src="/logo.png" alt="" className='w-10' />
                        <h2 className='text-2xl font-bold text-[#F17228]'>food<span className='text-[#FFB30E]'>wagon</span></h2>
                    </Link>
                    {/* Sidebar content here */}
                    <li>
                        <NavLink to="/dashboard/my-profile">
                            <MdPerson className="inline-block mr-2" />
                            My Profile
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/requested-meals">
                            <FaUtensils className="inline-block mr-2" />
                            Requested Meals
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/my-reviews">
                            <MdRateReview className="inline-block mr-2" />
                            My Reviews
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/payment-history">
                            <FaCreditCard className="inline-block mr-2" />
                            Payment History
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/manage-users">
                            <FaUsers className="inline-block mr-2" />
                            Manage Users
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/add-meal">
                            <GiHotMeal className="inline-block mr-2" />
                            Add Meal
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/all-meals">
                            <MdFastfood  className="inline-block mr-2" />
                            All Meals
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/all-reviews">
                            <FaRegComments className="inline-block mr-2" />
                            All Reviews
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/serve-meals">
                            <GiChefToque className="inline-block mr-2" />
                            Serve Meals
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/upcoming-meals">
                            <AiOutlineCalendar className="inline-block mr-2" />
                            Upcoming Meals
                        </NavLink>
                    </li>
                </ul>
                <div className='flex flex-col'>
                    <div className='divider'></div>
                    <button onClick={handleLogout} className='btn bg-gradient-to-r from-[#FFAE00] to-[#FF8A00] text-white rounded-tl-3xl rounded-bl-3xl rounded-tr-none rounded-br-none'><CiLogout />Logout</button>
                </div>
            </div>
        </div>
    </div>
    );
};

export default DashboardLayout;