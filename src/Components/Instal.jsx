import React from 'react';
import discount from '../assets/install/discount.png';
import location from '../assets/install/location.png';
import delivery from '../assets/install/delivery.png'

const Instal = () => {
    return (
        <div className='bg-[#FEEFD0] mb-10 py-20'>
            <div className='bg-white w-fit mx-auto flex flex-col md:flex-row items-center justify-center p-5 lg:p-10 rounded-3xl'>
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
        </div>
    );
};

export default Instal;