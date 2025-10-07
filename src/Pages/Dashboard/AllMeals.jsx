import React from 'react';
import { Helmet } from 'react-helmet';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../Components/Shared/Loading';
import { Link } from 'react-router';
import { FaStar } from 'react-icons/fa';

const AllMeals = () => {
    const axiosSecure = useAxiosSecure();
    const { data: allMeals = [], isLoading } = useQuery({
        queryKey: ["allMeals"],
        queryFn: async() => {
            const res = await axiosSecure.get(`/meals`);
            return res.data;
        }
    });
    if(isLoading){
        return <Loading/>;
    };
    return (
        <>
            <Helmet>
                <title>Dashboard | All Meals</title>
            </Helmet>
            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 p-10 gap-5'>
                {
                    allMeals.map((m) => (
                        <div key={m.id} className='border-2 border-base-200 rounded-2xl p-5 bg-white space-y-3'>
                            <div className='relative'>
                                <img src={m?.image} alt={m?.title} className='h-60 w-full object-cover rounded-md' />
                                <span className='absolute top-2 left-2 bg-white text-yellow-400 flex items-center gap-1 p-1 rounded-md'>
                                    <FaStar />
                                    {m.rating}
                                </span>
                            </div>
                            <h2 className='text-2xl font-semibold'>{m?.title}</h2>
                            <p className='text-base text-black'>${m?.price}</p>
                            <Link to={`/meal/${m.id}`} className='btn bg-gradient-to-r from-[#FFAE00] to-[#FF8A00] text-white border-none w-full'>Details</Link>
                        </div>
                    ))
                }
            </div>
        </>
    );
};

export default AllMeals;