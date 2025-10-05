import React from 'react';
import { FaFacebook, FaGithub, FaLinkedin } from 'react-icons/fa';
import { FiMail } from 'react-icons/fi';
import { Link } from 'react-router';
import useAuthContext from '../../Hooks/useAuthContext';
import Swal from 'sweetalert2';

const Footer = () => {
    const { user } = useAuthContext();
    const handleSubscribe = (e) => {
        e.preventDefault();
        // const email = e.target.email.value;
        Swal.fire({
            icon: "success",
            title: "Congratulations!",
            text: `thank you for subscribing`,
            confirmButtonColor: "#FFAE00"
        });
    };
    return (
        <div className='bg-black py-10 px-0 2xl:px-[7%]'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-around gap-10 lg:gap-0 pl-5 lg:pl-0'>
                {/* Company */}
                <div className='text-white space-y-5'>
                    <h2 className='font-bold text-base'>Company</h2>
                    <div className='space-y-2 flex flex-col'>
                        <Link to="/" className='link-hover'>Home</Link>
                        <Link to="/meals" className='link-hover'>Meals</Link>
                        <Link to="/upcomingMeals" className='link-hover'>Upcoming Meals</Link>
                        {
                            user && 
                            <Link to="/dashboard/my-profile" className='link-hover'>Dashboard</Link>
                        }
                    </div>
                </div>
                {/* Contact */}
                <div className='text-white space-y-5'>
                    <h2 className='font-bold text-base'>Contact</h2>
                    <div className='space-y-2 flex flex-col'>
                        <Link to="/" className='link-hover'>Help & Support</Link>
                        <Link to="/" className='link-hover'>Partner with us</Link>
                        <Link to="/" className='link-hover'>Ride with us</Link>
                    </div>
                </div>
                {/* Legal */}
                <div className='text-white space-y-5'>
                    <h2 className='font-bold text-base'>Legal</h2>
                    <div className='space-y-2 flex flex-col'>
                        <Link to="/" className='link-hover'>Terms & Conditions</Link>
                        <Link to="/" className='link-hover'>Refund & Cancellation</Link>
                        <Link to="/" className='link-hover'>Privacy Policy</Link>
                        <Link to="/" className='link-hover'>Cookie Policy</Link>
                    </div>
                </div>
                {/* Follow Us */}
                <div className='text-white space-y-5'>
                    <h2 className='font-bold text-base'>FOLLOW US</h2>
                    <div className='flex items-center gap-3'>
                        <a href="https://www.facebook.com/meshal.67" target="_blank" rel="noopener noreferrer"><FaFacebook size={20} /></a>
                        <a href="https://github.com/meshal10613" target="_blank" rel="noopener noreferrer"><FaGithub size={20} /></a>
                        <a href="https://www.linkedin.com/in/10613-meshal" target="_blank" rel="noopener noreferrer"><FaLinkedin size={20} /></a>
                    </div>
                    <p>Receive exclusive offers in your mailbox</p>
                    <form onSubmit={handleSubscribe} className="flex items-center space-x-2 bg-transparent py-4">
                        <div className="flex items-center bg-gray-800 text-white px-4 py-2 rounded-md w-full max-w-xs shadow-inner">
                            <FiMail className="text-gray-400 mr-2" />
                            <input
                                type="email"
                                name='email'
                                placeholder={`Enter Your email`}
                                className="bg-transparent focus:outline-none w-full placeholder:text-gray-400"
                            />
                        </div>
                        <button type='submit' className="bg-gradient-to-r from-[#FFAE00] to-[#FF8A00] hover:bg-gradient-to-l text-white font-semibold px-4 py-2 rounded-md shadow-lg transition duration-200 cursor-pointer">
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>
            <div className="divider divider-warning"></div>
            <p className='text-white text-center'>All rights Reserved © FoodWagon {new Date().getFullYear()}</p>
        </div>
    );
};

export default Footer;