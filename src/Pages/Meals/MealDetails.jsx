import React from "react";
import { useParams } from "react-router";
import useAxios from "../../Hooks/useAxios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Loading from "../../Components/Shared/Loading";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import useAuthContext from "../../Hooks/useAuthContext";
import Swal from "sweetalert2";
import AddReview from "./AddReview";
import Review from "./Review";

const MealDetails = () => {
    const queryClient = useQueryClient();
    const axios = useAxios();
    const { id } = useParams();
    const { user } = useAuthContext();
    const { data: meal = [], isLoading } = useQuery({
        queryKey: ["meal", id],
        queryFn: async () => {
            const res = await axios.get(`/meals/${id}`);
            return res.data.data;
        },
    });

    // mutation: update like
    const increaseLike = useMutation({
        mutationFn: async (id) => {
            const res = await axios.patch(`/meals/like/${id}`, {
                mealId: meal?.id,
                likes: meal?.likes,
                userName: user?.displayName,
                userEmail: user?.email,
            });
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["meal"]);
        },
    });

    //     useEffect(() => {
    // /*************  ✨ Windsurf Command ⭐  *************/
    // /**
    //  * Fetch likes for a meal.
    //  *
    //  * @returns {Promise<void>} - A promise that resolves when the likes are fetched.
    //  */
    // /**
    // /*******  257f8231-9b2e-441e-957b-ce61dd2ab40e  *******/
    //         const fetchLikes = async() => {
    //             try{
    //                 setLoading(true);
    //                 const res = await axios.get(`/likes/${meal?.id}`,
    //                     {
    //                         params: { q: user?.email }
    //                     }
    //                 );
    //                 if(res.status === 200 && res.statusText === "OK" && res.data !== ""){
    //                     setLiked(true);
    //                 }else{
    //                     setLiked(false);
    //                 }
    //             }finally{
    //                 setLoading(false);
    //             }
    //         };

    //         fetchLikes();
    //     }, [meal, axios, user]);

    const handleLike = (id) => {
        if (!user) {
            Swal.fire({
                title: "Sorry!",
                text: "Please login to continue",
                icon: "question",
                confirmButtonColor: "#FFAE00",
            });
        } else if (meal.likesCount === 1) {
            Swal.fire({
                title: "Sorry!",
                text: "You've already liked",
                icon: "error",
                confirmButtonColor: "#FFAE00",
            });
        } else {
            increaseLike.mutate(id);
        }
    };

    const handleRequestMeal = (id) => {
        if (!user) {
            Swal.fire({
                title: "Sorry!",
                text: "Please login to continue",
                icon: "question",
                confirmButtonColor: "#FFAE00",
            });
        } else {
            console.log(id);
        }
    };

    return (
        <>
            {isLoading && <Loading />}
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start max-w-7xl mx-auto">
                    {/* Image Section */}
                    <div className="order-1 lg:order-2">
                        <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                            <img
                                src={meal?.image}
                                alt={meal?.title}
                                className="w-full h-96 sm:h-[500px] lg:h-full object-cover transition-transform duration-700 hover:scale-105"
                            />
                            {/* Optional overlay badge for category */}
                            <div className="absolute top-4 left-4">
                                <span className="badge badge-primary badge-lg px-4 py-2 text-white font-medium shadow-lg">
                                    {meal?.category}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="order-2 lg:order-1 flex flex-col justify-center space-y-6">
                        {/* Title & Like Button */}
                        <div className="flex flex-row items-start justify-between gap-4">
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                                {meal?.title}
                            </h2>

                            <button
                                onClick={() => handleLike(meal?.id)}
                                disabled={meal.likesCount === 1}
                                className={`group relative p-3 rounded-full transition-all duration-300 ${
                                    meal.likesCount === 1
                                        ? "bg-red-100 cursor-not-allowed"
                                        : "bg-gray-100 hover:bg-red-100 hover:scale-110 cursor-pointer"
                                }`}
                                title={
                                    meal.likesCount === 1
                                        ? "Already liked"
                                        : "Like this meal"
                                }
                            >
                                {meal.likesCount === 1 ? (
                                    <FaHeart
                                        size={28}
                                        className="text-red-500 drop-shadow-md"
                                    />
                                ) : (
                                    <FaRegHeart
                                        size={28}
                                        className="text-red-500 group-hover:text-red-600 transition-colors"
                                    />
                                )}
                                {/* Pulse animation when liked */}
                                {meal.likesCount === 1 && (
                                    <span className="absolute inset-0 rounded-full animate-ping bg-red-400 opacity-30"></span>
                                )}
                            </button>
                        </div>

                        {/* Price */}
                        <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FFAE00] to-[#FF8A00]">
                            ৳{meal?.price}
                        </p>

                        {/* Description */}
                        <p className="text-lg text-gray-700 leading-relaxed">
                            {meal?.description}
                        </p>

                        {/* Ingredients */}
                        <div className="space-y-3">
                            <h4 className="text-xl font-semibold text-gray-900">
                                Ingredients
                            </h4>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {meal?.ingredients?.map((ingredient, index) => (
                                    <li
                                        key={index}
                                        className="flex items-center text-gray-700"
                                    >
                                        <span className="w-2 h-2 bg-orange-400 rounded-full mr-3 flex-shrink-0"></span>
                                        {ingredient}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="flex items-center justify-between gap-5">
                            <AddReview
                                id={id}
                                queryClient={queryClient}
                                title={meal?.title}
                                category={meal?.category}
                            />
                            <button
                                onClick={() => handleRequestMeal(meal?.id)}
                                className="btn bg-gradient-to-r from-[#FFAE00] to-[#FF8A00] text-white py-3 rounded-lg flex-1"
                            >
                                Request Meal
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {meal.reviews && <Review reviews={meal.reviews} />}
        </>
    );
};

export default MealDetails;
