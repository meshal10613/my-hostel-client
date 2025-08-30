import React from 'react';
import Proceed1 from '../assets/Proceed-to-power1.png';
import Proceed2 from '../assets/Proceed-to-power2.png';
import Proceed3 from '../assets/Proceed-to-power3.png';
import { Link } from 'react-router';
import { RiArrowRightSLine } from 'react-icons/ri';

const ProceedToPower = () => {
    return (
        <div className='py-20 mb-10 mx-5 px-0 md:px-[7%] space-y-20'>
            {/* Proceed 1 */}
            <div className='bg-white shadow-2xl rounded-2xl flex flex-col md:flex-row justify-between'>
                <div className='p-10 lg:p-20 flex flex-col justify-between gap-10'>
                    <div className='space-y-3'>
                        <h2 className='text-4xl font-bold'>Best deals <span className='text-[#FFAE00]'>Crispy <br /> Sandwiches</span></h2>
                        <p className='text-gray-500'>Enjoy the large size of sandwiches. Complete perfect slice of sandwiches.</p>
                    </div>
                    <Link className='btn bg-gradient-to-r from-[#FFAE00] to-[#FF8A00] text-white'>PROCEED TO ORDER<RiArrowRightSLine size={20} /></Link>
                </div>
                <div className=''>
                    <img src={Proceed1} alt="" className='md:rounded-tr-2xl rounded-br-2xl rounded-bl-2xl md:rounded-bl-none bg-cover h-full' />
                </div>
            </div>
            {/* Proceed 2 */}
            <div className='bg-white shadow-2xl rounded-2xl flex flex-col md:flex-row justify-between'>
                <div>
                    <img src={Proceed2} alt="" className='rounded-tl-2xl rounded-tr-2xl md:rounded-tr-none md:rounded-bl-2xl bg-cover h-full' />
                </div>
                <div className='p-10 lg:p-20 flex flex-col justify-between gap-10'>
                    <div className='space-y-3'>
                        <h2 className='text-4xl font-bold'>Wanna eat hot <br /> & spicy <span className='text-[#FFAE00]'>Pizza? </span></h2>
                        <p className='text-gray-500'>Get the best fried chicken smeared with a lip smacking lemon chili flavor. Check out best deals for fried chicken.</p>
                    </div>
                    <Link className='btn bg-gradient-to-r from-[#FFAE00] to-[#FF8A00] text-white'>PROCEED TO ORDER <RiArrowRightSLine size={20} /></Link>
                </div>
            </div>
            {/* Proceed 3 */}
            <div className='bg-white shadow-2xl rounded-2xl flex flex-col md:flex-row justify-between'>
                <div className='p-10 lg:p-20 flex flex-col justify-between gap-10'>
                    <div className='space-y-3'>
                        <h2 className='text-4xl font-bold'>Best deals <span className='text-[#FFAE00]'>Crispy <br /> Sandwiches</span></h2>
                        <p className='text-gray-500'>Pair up with a friend and enjoy the hot and crispy pizza pops. Try it with the best deals.</p>
                    </div>
                    <Link className='btn bg-gradient-to-r from-[#FFAE00] to-[#FF8A00] text-white'>PROCEED TO ORDER <RiArrowRightSLine size={20} /></Link>
                </div>
                <div className=''>
                    <img src={Proceed3} alt="" className='md:rounded-tr-2xl rounded-br-2xl rounded-bl-2xl md:rounded-bl-none bg-cover h-full' />
                </div>
            </div>
        </div>
    );
};

export default ProceedToPower;