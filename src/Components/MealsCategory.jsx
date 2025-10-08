import React, { useState } from 'react';
import useAxios from '../Hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import Loading from './Shared/Loading';
import { Link } from 'react-router';
import { FaStar } from 'react-icons/fa';

const MealsCategory = () => {
    const [isActive, setIsActive] = useState("all");
    const [category, setCategory] = useState("");
    const axios = useAxios();
    const { data: meals = [], isLoading } = useQuery({
        queryKey: ["category", category],
        queryFn: async() => {
            const res = await axios.get(`/meals?category=${category}`);
            return res.data;
        }
    });

    if(isLoading){
        return <Loading/>;
    };

    const handleMealsButton = (meal) => {
        setIsActive(meal);
        if(meal === "breakfast"){
            setCategory("Breakfast")
        }else if(meal === "lunch"){
            setCategory("Lunch");
        }else if(meal === "dinner"){
            setCategory("Dinner")
        }else{
            setCategory("");
        };
    };
    return (
        <div className='px-0 2xl:px-[7%]'>
            <div className='flex items-center justify-center gap-3 meals-btn'>
                <button onClick={() => handleMealsButton("all")} className={`btn cursor-pointer bg-white text-primary ${isActive === "all" ? "active" : ""}`}>
                    All Meals
                </button>
                <button onClick={() => handleMealsButton("breakfast")} className={`btn cursor-pointer bg-white text-primary ${isActive === "breakfast" ? "active" : ""}`}>
                    Breakfast
                </button>
                <button onClick={() => handleMealsButton("lunch")} className={`btn cursor-pointer bg-white text-primary ${isActive === "lunch" ? "active" : ""}`}>
                    Lunch
                </button>
                <button onClick={() => handleMealsButton("dinner")} className={`btn cursor-pointer bg-white text-primary ${isActive === "dinner" ? "active" : ""}`}>
                    Dinner
                </button>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 p-10 gap-5'>
                {
                    meals.map((m) => (
                        <div key={m?.id} className='border-2 border-base-200 rounded-2xl p-5 bg-white space-y-3'>
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
        </div>
    );
};

export default MealsCategory;