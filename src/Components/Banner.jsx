import React from 'react';
import BannerImage from '../assets/Banner.png'

const Banner = () => {
    const handleBannerSearch = (e) => {
        e.preventDefault();
        const banner = e.target.banner.value;
        console.log(banner)
    };
    return (
        <div className='bg-gradient-to-r from-[#FFAE00] to-[#FF8A00] py-32 xl:py-40 px-0 2xl:px-[7%] relative overflow-hidden mb-10'>
            <div className='flex flex-col items-center lg:items-baseline justify-baseline space-y-3'>
                <h2 className='text-white text-5xl md:text-6xl font-semibold'>Are you starving?</h2>
                <p>Within a few clicks, find meals that are accessible near you</p>
                <form onSubmit={handleBannerSearch} className='bg-white min-w-xs md:min-w-md max-w-2xl flex flex-row items-center gap-5 rounded-xl p-5'>
                    <input type="text" name="banner" id="" placeholder='Search Your Meal' className='flex-1 bg-gray-100 h-10 rounded-md pl-3' required />
                    <button type="submit" className='btn bg-gradient-to-r from-[#FFAE00] to-[#FF8A00] text-white'>Find Food</button>
                </form>
            </div>
            <img src={BannerImage} alt="Banner Image" className='w-fit absolute -bottom-10 right-0 xl:right-20 hidden lg:block' />
        </div>
    );
};

export default Banner;