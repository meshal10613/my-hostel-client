import React from 'react';
import map from '../assets/Map Marker.png';
import menu from '../assets/Menu.png'
import icon from '../assets/Icons.png'
import donut from '../assets/Donut.png'

const HowItWorks = () => {
    const works = [
        {
            id: 1,
            image: map,
            title: "Select location",
            description: "Choose the location where your food will be delivered."
        },
        {
            id: 2,
            image: menu,
            title: "Choose order",
            description: "Check over hundreds of menus to pick your favorite food"
        },
        {
            id: 3,
            image: icon,
            title: "Pay advanced",
            description: "It's quick, safe, and simple. Select several methods of payment"
        },
        {
            id: 4,
            image: donut,
            title: "Enjoy meals",
            description: "Food is made and delivered directly to your home."
        }
    ]
    return (
        <div className='bg-gradient-to-b from-[#FFCE67] to-[#FDEDCA0] py-20 mb-10 px-0 2xl:px-[7%]'>
            <h2 className='text-[#F17228] text-center text-3xl font-semibold mb-5'>How does it work</h2>
            <div className='grid grid-cols-2 lg:grid-cols-4 gap-10 text-center items-center'>
                {
                    works.map((w) => (
                        <div key={w.id} className='w-52 mx-auto flex flex-col items-center justify-center'>
                            <img src={w?.image} alt="" className='w-28' />
                            <h2 className='text-xl font-semibold'>{w.title}</h2>
                            <p className='text-gray-500'>{w.description}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default HowItWorks;