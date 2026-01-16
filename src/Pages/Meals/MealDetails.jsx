import React from "react";
import { useParams } from "react-router";
import useAxios from "../../Hooks/useAxios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Loading from "../../Components/Shared/Loading";
import {
    FaHeart,
    FaRegHeart,
    FaUtensils,
    FaStar,
} from "react-icons/fa";
import useAuthContext from "../../Hooks/useAuthContext";
import Swal from "sweetalert2";
import AddReview from "./AddReview";
import Review from "./Review";

const MealDetails = () => {
    const queryClient = useQueryClient();
    const axios = useAxios();
    const { id } = useParams();
    const { user } = useAuthContext();

    const { data: meal = {}, isLoading } = useQuery({
        queryKey: ["meal", id],
        queryFn: async () => {
            const res = await axios.get(`/meals/${id}`);
            return res.data.data;
        },
    });

    const increaseLike = useMutation({
        mutationFn: async (id) => {
            const res = await axios.patch(`/likes/${id}`, {
                email: user.email,
            });
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["meal"]);
        },
    });

    const handleLike = (id) => {
        if (!user) {
            Swal.fire({
                title: "Please Login",
                text: "You need to be logged in to like this meal.",
                icon: "warning",
                confirmButtonColor: "#FFAE00",
            });
        } else {
            increaseLike.mutate(id);
        }
    };

    const handleRequestMeal = (id) => {
        if (!user) {
            Swal.fire({
                title: "Please Login",
                text: "You need to be logged in to request a meal.",
                icon: "warning",
                confirmButtonColor: "#FFAE00",
            });
        } else {
            // Logic for modal or navigation to request page
            console.log("Requesting:", id);
        }
    };

    if (isLoading) return <Loading />;

    return (
        <div className="min-h-screen py-8 lg:py-12">
            {/* Breadcrumb / Back Navigation could go here */}

            <div className="container mx-auto px-4 max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                    {/* Left Column: Image (Sticky on Desktop) */}
                    <div className="lg:col-span-5 relative">
                        <div className="lg:sticky lg:top-24 space-y-6">
                            <div className="relative group overflow-hidden rounded-3xl shadow-xl aspect-square lg:aspect-[4/5] bg-white">
                                <img
                                    src={meal?.image}
                                    alt={meal?.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />

                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60"></div>

                                {/* Category Badge */}
                                <div className="absolute top-4 left-4">
                                    <span className="backdrop-blur-md bg-white/90 text-orange-600 px-4 py-1.5 rounded-full text-sm font-bold shadow-sm flex items-center gap-2">
                                        <FaUtensils size={12} />
                                        {meal?.category}
                                    </span>
                                </div>

                                {/* Like Button - Floating on Image */}
                                <button
                                    onClick={() => handleLike(meal?.id)}
                                    className="absolute top-4 right-4 p-3 bg-white/95 hover:bg-white rounded-full shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 z-10 cursor-pointer"
                                >
                                    {meal.likesCount === 1 ? (
                                        <FaHeart className="text-red-500 text-xl" />
                                    ) : (
                                        <FaRegHeart className="text-gray-400 hover:text-red-500 text-xl transition-colors" />
                                    )}
                                </button>
                            </div>

                            {/* Distributor Info Card */}
                            {/* <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 text-xl">
                                    <FaUser />
                                </div>
                                <div className="flex-1">
                                    <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider">
                                        Distributor
                                    </p>
                                    <h4 className="text-gray-800 font-bold">
                                        {meal?.adminName || "Admin"}
                                    </h4>
                                    <p className="text-xs text-gray-400 truncate">
                                        {meal?.adminEmail}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider">
                                        Posted
                                    </p>
                                    <div className="flex items-center gap-1 text-sm font-medium text-gray-700">
                                        <FaCalendarAlt className="text-orange-400" />
                                        {formatDate(meal?.postTime)}
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </div>

                    {/* Right Column: Details */}
                    <div className="lg:col-span-7 flex flex-col space-y-4">
                        {/* Header Section */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-yellow-500 text-sm font-bold">
                                <FaStar />
                                <span>{meal?.averageRating || "4.8"}</span>
                                <span className="text-gray-400 font-normal">
                                    ({meal?.reviews.length || 0} Reviews)
                                </span>
                            </div>

                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
                                {meal?.title}
                            </h1>

                            <div className="flex items-end gap-3">
                                <span className="text-4xl font-bold text-orange-500">
                                    ৳{meal?.price}
                                </span>
                                {meal?.oldPrice && (
                                    <span className="text-xl text-gray-400 line-through mb-1">
                                        ৳{meal.oldPrice}
                                    </span>
                                )}
                            </div>
                            <div className="divider"></div>
                        </div>

                        {/* Description */}
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-3">
                                Description
                            </h3>
                            <p className="text-gray-600 leading-7 text-lg">
                                {meal?.description}
                            </p>
                        </div>

                        {/* Ingredients */}
                        <div className="bg-orange-50/50 p-6 rounded-2xl border border-orange-100">
                            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <span className="w-1.5 h-6 bg-orange-500 rounded-full"></span>
                                Ingredients
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {meal?.ingredients?.map((ingredient, index) => (
                                    <span
                                        key={index}
                                        className="px-4 py-2 bg-white text-gray-700 text-sm font-medium rounded-lg shadow-sm border border-gray-100 flex items-center gap-2"
                                    >
                                        <div className="w-2 h-2 rounded-full bg-orange-400"></div>
                                        {ingredient}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                            <button
                                onClick={() => handleRequestMeal(meal?.id)}
                                className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white text-lg font-bold py-4 rounded-xl shadow-lg shadow-orange-500/30 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
                            >
                                Request Meal
                            </button>

                            <div className="w-full">
                                <AddReview
                                    id={id}
                                    queryClient={queryClient}
                                    title={meal?.title}
                                    category={meal?.category}
                                    className="w-full h-full" // Assuming AddReview accepts className
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Reviews Section - Separator */}
                {meal.reviews && <Review reviews={meal.reviews} />}
            </div>
        </div>
    );
};

export default MealDetails;
