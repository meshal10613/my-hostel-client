import React from 'react';
import discount from '../assets/install/discount.png';
import location from '../assets/install/location.png';
import delivery from '../assets/install/delivery.png';
import mobile from '../assets/install/mobile.png';
import app from '../assets/install/app.png';
import play from '../assets/install/play.png';

const Instal = () => {
    return (
        <div className='bg-[#FEEFD0] mb-10 pt-20'>
            <div className='bg-white w-fit mx-auto flex flex-col md:flex-row items-center justify-center p-5 lg:p-10 rounded-3xl shadow-xl mb-10'>
                <div className='flex items-center gap-2'>
                    <img src={discount} alt="discount" className='w-24 md:w-28' />
                    <h2 className='text-2xl font-bold bg-gradient-to-r from-[#FB3C00] to-[#FFB800] bg-clip-text text-transparent'>Daily <br /> Discounts</h2>
                </div>
                <div className="divider md:divider-horizontal"></div>
                <div className='flex items-center gap-2'>
                    <img src={location} alt="location" className='w-24 md:w-28' />
                    <h2 className='text-2xl font-bold bg-gradient-to-r from-[#FB3C00] to-[#FFB800] bg-clip-text text-transparent'>Live <br /> Tracing</h2>
                </div>
                <div className="divider md:divider-horizontal"></div>
                <div className='flex items-center gap-2'>
                    <img src={delivery} alt="delivery" className='w-24 md:w-28' />
                    <h2 className='text-2xl font-bold bg-gradient-to-r from-[#FB3C00] to-[#FFB800] bg-clip-text text-transparent'>Quick <br /> Delivery</h2>
                </div>
            </div>

            <div className='flex flex-col-reverse xl:flex-row items-center justify-center gap-10 xl:gap-20'>
                <img src={mobile} alt="" className='w-fit' />
                <div className='space-y-5 flex flex-col'>
                    <h2 className='text-5xl font-bold bg-gradient-to-r from-[#FFAE00] to-[#FF8A00] bg-clip-text text-transparent'>Install the app</h2>
                    <p className='text-[#827E7E]'>It's never been easier to order food. Look for the <br /> finest discounts and you'll be lost in a world of <br /> delectable food.</p>
                    <div className='flex items-center gap-0'>
                        <img src={play} alt="" className='h-28' />
                        <img src={app} alt="" className='h-28' />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Instal;