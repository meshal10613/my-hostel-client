import React from 'react';
import { FaFacebook, FaGithub, FaLinkedin } from 'react-icons/fa';
import { FiMail } from 'react-icons/fi';
import { Link } from 'react-router';

const Footer = () => {
    return (
        <div className='bg-black py-10 px-0 2xl:px-[7%]'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-around gap-10 lg:gap-0 pl-5 lg:pl-0'>
                {/* Company */}
                <div className='text-white space-y-5'>
                    <h2 className='font-bold text-base'>Company</h2>
                    <div className='space-y-2 flex flex-col'>
                        <Link to="/">Home</Link>
                        <Link to="/meals">Meals</Link>
                        <Link to="/upcomingMeals">Upcoming Meals</Link>
                        <Link to="/">Dashboard</Link>
                    </div>
                </div>
                {/* Contact */}
                <div className='text-white space-y-5'>
                    <h2 className='font-bold text-base'>Contact</h2>
                    <div className='space-y-2 flex flex-col'>
                        <Link to="/">Help & Support</Link>
                        <Link to="/">Partner with us</Link>
                        <Link to="/">Ride with us</Link>
                    </div>
                </div>
                {/* Legal */}
                <div className='text-white space-y-5'>
                    <h2 className='font-bold text-base'>Legal</h2>
                    <div className='space-y-2 flex flex-col'>
                        <Link to="/">Terms & Conditions</Link>
                        <Link to="/">Refund & Cancellation</Link>
                        <Link to="/">Privacy Policy</Link>
                        <Link to="/">Cookie Policy</Link>
                    </div>
                </div>
                {/* Follow Us */}
                <div className='text-white space-y-5'>
                    <h2 className='font-bold text-base'>FOLLOW US</h2>
                    <div className='flex items-center gap-3'>
                        <a href="" target="_blank" rel="noopener noreferrer"><FaFacebook size={20} /></a>
                        <a href="" target="_blank" rel="noopener noreferrer"><FaGithub size={20} /></a>
                        <a href="" target="_blank" rel="noopener noreferrer"><FaLinkedin size={20} /></a>
                    </div>
                    <p>Receive exclusive offers in your mailbox</p>
                    <form className="flex items-center space-x-2 bg-transparent py-4">
                        <div className="flex items-center bg-gray-800 text-white px-4 py-2 rounded-md w-full max-w-xs shadow-inner">
                            <FiMail className="text-gray-400 mr-2" />
                            <input
                                type="email"
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