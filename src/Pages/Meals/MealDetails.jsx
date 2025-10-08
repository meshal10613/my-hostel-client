import React from 'react';
import { useParams } from 'react-router';
import useAxios from '../../Hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../Components/Shared/Loading';
import { format } from "date-fns";

const MealDetails = () => {
    const axios = useAxios();
    const { id } = useParams()
    const { data: meal = [], isLoading } = useQuery({
        queryKey: ["meal"],
        queryFn: async() => {
            const res = await axios.get(`/meals/${id}`);
            return res.data;
        }
    });

    if(isLoading){
        return <Loading/>;
    };
    const time = format(new Date(meal?.postTime), "EEE MMM dd yyyy");
    return (
        <div className='px-0 2xl:px-[7%] flex items-center justify-between gap-10 my-10'>
            <div className='flex-1 space-y-3'>
                <h2 className='text-4xl font-semibold'>Name: {meal?.title}</h2>
                <h4 className='text-xl'>Category: {meal?.category}</h4>
                <p className='text-xl'>Price: {meal?.price}</p>
                <div className='flex items-center justify-between'>
                    <p className='text-xl'>Likes: {meal?.likes}</p>
                    <p className='text-xl'>Rating: {meal?.rating}</p>
                </div>
                <div className='space-y-1 bg-white p-5 rounded-2xl'>
                    <p className='text-base'>Description:</p>
                    <div>
                        {meal?.description}
                    </div>
                </div>
                <div className='space-y-1'>
                    <h4>Ingredients:</h4>
                    <div className='ml-5'>
                        {
                            meal?.ingredients.map((i, index) => (
                                <li key={index}>{i}</li>
                            ))
                        }
                    </div>
                </div>
                <p className='text-center'>Added by {meal?.distributerName} on {time}</p>
            </div>
            <div className='flex-1'>
                <img src={meal?.image} alt={meal?.title} className='rounded-2xl' />
            </div>
        </div>
    );
};

export default MealDetails;