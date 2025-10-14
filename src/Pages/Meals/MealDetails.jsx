import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import useAxios from '../../Hooks/useAxios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Loading from '../../Components/Shared/Loading';
import { format } from "date-fns";
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import useAuthContext from '../../Hooks/useAuthContext';
import Swal from 'sweetalert2';

const MealDetails = () => {
    const queryClient = useQueryClient();
    const axios = useAxios();
    const { id } = useParams();
    const { user } = useAuthContext();
    const [liked, setLiked] = useState(false);
    const { data: meal = [], isLoading } = useQuery({
        queryKey: ["meal"],
        queryFn: async() => {
            const res = await axios.get(`/meals/${id}`);
            return res.data;
        }
    });

    // mutation: make admin
    const increaseLike = useMutation({
        mutationFn: async (id) => {
            const res = await axios.patch(`/meals/like/${id}`, 
                { 
                    mealId: meal?.id, 
                    likes: meal?.likes,
                    userName: user?.displayName,
                    userEmail: user?.email
                });
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["meal"]);
        },
    });

    useEffect(() => {
        const fetchLikes = async() => {
            const res = await axios.get(`/likes/${meal?.id}`, 
                {
                    params: { q: user?.email }
                }
            );
            if(res.status === 200 && res.statusText === "OK" && res.data !== ""){
                setLiked(true);
            }else{
                setLiked(false);
            }
        };

        fetchLikes();
    }, [meal, axios, user]);

    if(isLoading){
        return <Loading/>;
    };
    const time = format(new Date(meal?.postTime), "EEE MMM dd yyyy");

    const handleLike = (id) => {
        if(!user){
            Swal.fire({
                title: "Sorry!",
                text: "Please login to continue",
                icon: "question",
                confirmButtonColor: "#FFAE00"
            });
        }else if(liked){
            Swal.fire({
                title: "Sorry!",
                text: "You've already liked",
                icon: "error",
                confirmButtonColor: "#FFAE00"
            });
        }else{
            increaseLike.mutate(id);
        };
    };

    const handleRequestMeal = (id) => {
        if(!user){
            Swal.fire({
                title: "Sorry!",
                text: "Please login to continue",
                icon: "question",
                confirmButtonColor: "#FFAE00"
            });
        }else{
            console.log(id)
        };
    };

    return (
        <div className='px-0 2xl:px-[7%] flex flex-col-reverse md:flex-row md:items-center justify-between gap-10 my-10 mx-5 md:mx-0'>
            <div className='flex-1 space-y-3'>
                <h2 className='text-4xl font-semibold'>{meal?.title} <span className='badge badge-primary'>{meal?.category}</span></h2>
                <p className='text-xl'>$ {meal?.price}</p>
                <p>{meal?.description}</p>
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
                <div className='flex items-center justify-between gap-5 w-1/2'>
                    <button 
                        onClick={() => handleLike(meal?.id)} 
                        className={`flex items-center gap-2 btn btn-block bg-white border border-primary text-primary transition-all ${liked ? "cursor-not-allowed" : "cursor-pointer"}`}
                        >
                        {
                            liked ?
                            <FaHeart size={20} className='text-red-500' />:
                            <FaRegHeart size={20} className='text-red-500' />
                        }
                        {meal?.likes}
                    </button>
                    <button onClick={() => handleRequestMeal(meal?.id)} className='btn w-full bg-gradient-to-r from-[#FFAE00] to-[#FF8A00] text-white py-3 rounded-lg'>Request Meal</button>
                </div>
                <p className='text-center'>Added by {meal?.distributerName} on {time}</p>
            </div>
            <div className='flex-1'>
                <img src={meal?.image} alt={meal?.title} className='rounded-2xl w-[100%] h-98 md:h-[500px] object-cover' />
            </div>
        </div>
    );
};

export default MealDetails;