// import React from "react";
// import { useParams } from "react-router";
// import useAxios from "../../Hooks/useAxios";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import Loading from "../../Components/Shared/Loading";
// import { FaHeart, FaRegHeart } from "react-icons/fa";
// import useAuthContext from "../../Hooks/useAuthContext";
// import Swal from "sweetalert2";
// import AddReview from "./AddReview";
// import Review from "./Review";

// const MealDetails = () => {
//     const queryClient = useQueryClient();
//     const axios = useAxios();
//     const { id } = useParams();
//     const { user } = useAuthContext();
//     const { data: meal = [], isLoading } = useQuery({
//         queryKey: ["meal", id],
//         queryFn: async () => {
//             const res = await axios.get(`/meals/${id}`);
//             return res.data.data;
//         },
//     });

//     // mutation: update like
//     const increaseLike = useMutation({
//         mutationFn: async (id) => {
//             const res = await axios.patch(`/meals/like/${id}`, {
//                 mealId: meal?.id,
//                 likes: meal?.likes,
//                 userName: user?.displayName,
//                 userEmail: user?.email,
//             });
//             return res.data;
//         },
//         onSuccess: () => {
//             queryClient.invalidateQueries(["meal"]);
//         },
//     });

//         // useEffect(() => {
//         //     const fetchLikes = async() => {
//         //         try{
//         //             setLoading(true);
//         //             const res = await axios.get(`/likes/${meal?.id}`,
//         //                 {
//         //                     params: { q: user?.email }
//         //                 }
//         //             );
//         //             if(res.status === 200 && res.statusText === "OK" && res.data !== ""){
//         //                 setLiked(true);
//         //             }else{
//         //                 setLiked(false);
//         //             }
//         //         }finally{
//         //             setLoading(false);
//         //         }
//         //     };

//         //     fetchLikes();
//         // }, [meal, axios, user]);

//     const handleLike = (id) => {
//         if (!user) {
//             Swal.fire({
//                 title: "Sorry!",
//                 text: "Please login to continue",
//                 icon: "question",
//                 confirmButtonColor: "#FFAE00",
//             });
//         } else if (meal.likesCount === 1) {
//             Swal.fire({
//                 title: "Sorry!",
//                 text: "You've already liked",
//                 icon: "error",
//                 confirmButtonColor: "#FFAE00",
//             });
//         } else {
//             increaseLike.mutate(id);
//         }
//     };

//     const handleRequestMeal = (id) => {
//         if (!user) {
//             Swal.fire({
//                 title: "Sorry!",
//                 text: "Please login to continue",
//                 icon: "question",
//                 confirmButtonColor: "#FFAE00",
//             });
//         } else {
//             console.log(id);
//         }
//     };

//     return (
//         <>
//             {isLoading && <Loading />}
//             <div className="container mx-auto px-4 py-12">
//                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start max-w-7xl mx-auto">
//                     {/* Image Section */}
//                     <div className="order-1 lg:order-2">
//                         <div className="relative overflow-hidden rounded-3xl shadow-2xl">
//                             <img
//                                 src={meal?.image}
//                                 alt={meal?.title}
//                                 className="w-full h-96 sm:h-[500px] lg:h-full object-cover transition-transform duration-700 hover:scale-105"
//                             />
//                             {/* Optional overlay badge for category */}
//                             <div className="absolute top-4 left-4">
//                                 <span className="badge badge-primary badge-lg px-4 py-2 text-white font-medium shadow-lg">
//                                     {meal?.category}
//                                 </span>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Content Section */}
//                     <div className="order-2 lg:order-1 flex flex-col justify-center space-y-6">
//                         {/* Title & Like Button */}
//                         <div className="flex flex-row items-start justify-between gap-4">
//                             <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
//                                 {meal?.title}
//                             </h2>

//                             <button
//                                 onClick={() => handleLike(meal?.id)}
//                                 disabled={meal.likesCount === 1}
//                                 className={`group relative p-3 rounded-full transition-all duration-300 ${
//                                     meal.likesCount === 1
//                                         ? "bg-red-100 cursor-not-allowed"
//                                         : "bg-gray-100 hover:bg-red-100 hover:scale-110 cursor-pointer"
//                                 }`}
//                                 title={
//                                     meal.likesCount === 1
//                                         ? "Already liked"
//                                         : "Like this meal"
//                                 }
//                             >
//                                 {meal.likesCount === 1 ? (
//                                     <FaHeart
//                                         size={28}
//                                         className="text-red-500 drop-shadow-md"
//                                     />
//                                 ) : (
//                                     <FaRegHeart
//                                         size={28}
//                                         className="text-red-500 group-hover:text-red-600 transition-colors"
//                                     />
//                                 )}
//                                 {/* Pulse animation when liked */}
//                                 {meal.likesCount === 1 && (
//                                     <span className="absolute inset-0 rounded-full animate-ping bg-red-400 opacity-30"></span>
//                                 )}
//                             </button>
//                         </div>

//                         {/* Price */}
//                         <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FFAE00] to-[#FF8A00]">
//                             ৳{meal?.price}
//                         </p>

//                         {/* Description */}
//                         <p className="text-lg text-gray-700 leading-relaxed">
//                             {meal?.description}
//                         </p>

//                         {/* Ingredients */}
//                         <div className="space-y-3">
//                             <h4 className="text-xl font-semibold text-gray-900">
//                                 Ingredients
//                             </h4>
//                             <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
//                                 {meal?.ingredients?.map((ingredient, index) => (
//                                     <li
//                                         key={index}
//                                         className="flex items-center text-gray-700"
//                                     >
//                                         <span className="w-2 h-2 bg-orange-400 rounded-full mr-3 flex-shrink-0"></span>
//                                         {ingredient}
//                                     </li>
//                                 ))}
//                             </ul>
//                         </div>

//                         <div className="flex items-center justify-between gap-5">
//                             <AddReview
//                                 id={id}
//                                 queryClient={queryClient}
//                                 title={meal?.title}
//                                 category={meal?.category}
//                             />
//                             <button
//                                 onClick={() => handleRequestMeal(meal?.id)}
//                                 className="btn bg-gradient-to-r from-[#FFAE00] to-[#FF8A00] text-white py-3 rounded-lg flex-1"
//                             >
//                                 Request Meal
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {meal.reviews && <Review reviews={meal.reviews} />}
//         </>
//     );
// };

// export default MealDetails;

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
                userId: meal?.userId?._id,
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

    // Helper to format date
    // const formatDate = (dateString) => {
    //     if (!dateString) return "N/A";
    //     return new Date(dateString).toLocaleDateString("en-US", {
    //         year: "numeric",
    //         month: "long",
    //         day: "numeric",
    //     });
    // };

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
