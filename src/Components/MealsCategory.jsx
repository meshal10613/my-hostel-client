import React, { useEffect, useState } from "react";
import useAxios from "../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import Loading from "./Shared/Loading";
import { Link } from "react-router";

const MealsCategory = () => {
    const [isActive, setIsActive] = useState("all");
    const [category, setCategory] = useState("");
    const [showAll, setShowAll] = useState(false);
    const [sliceCount, setSliceCount] = useState(12);
    const axios = useAxios();
    const { data: meals = [], isLoading } = useQuery({
        queryKey: ["category", category],
        queryFn: async () => {
            const res = await axios.get(
                `/meals${category ? `?category=${category}` : ""}`
            );
            return res.data.data;
        },
    });

    const handleMealsButton = (meal) => {
        setIsActive(meal);
        if (meal === "breakfast") {
            setCategory("Breakfast");
        } else if (meal === "lunch") {
            setCategory("Lunch");
        } else if (meal === "dinner") {
            setCategory("Dinner");
        } else {
            setCategory("");
        }
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1536) {
                setSliceCount(10);
            } else {
                setSliceCount(12);
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const display = showAll ? meals : meals.slice(0, sliceCount);

    return (
        <div className="conatiner mx-auto z-50 px-4">
            <div className="flex items-center justify-center gap-3 meals-btn">
                <button
                    onClick={() => handleMealsButton("all")}
                    className={`btn cursor-pointer bg-white text-primary border-none ${
                        isActive === "all" ? "active" : ""
                    }`}
                >
                    All Meals
                </button>
                <button
                    onClick={() => handleMealsButton("breakfast")}
                    className={`btn cursor-pointer bg-white text-primary border-none ${
                        isActive === "breakfast" ? "active" : ""
                    }`}
                >
                    Breakfast
                </button>
                <button
                    onClick={() => handleMealsButton("lunch")}
                    className={`btn cursor-pointer bg-white text-primary border-none ${
                        isActive === "lunch" ? "active" : ""
                    }`}
                >
                    Lunch
                </button>
                <button
                    onClick={() => handleMealsButton("dinner")}
                    className={`btn cursor-pointer bg-white text-primary border-none ${
                        isActive === "dinner" ? "active" : ""
                    }`}
                >
                    Dinner
                </button>
            </div>
            {isLoading && <Loading />}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-6 w-fit mx-auto my-10">
                {display.map((m) => (
                    <Link
                        to={`/meal/${m.id}`}
                        key={m?.id}
                        className="shadow-md transition-all duration-300 hover:shadow-2xl rounded-2xl bg-white max-w-76"
                    >
                        <div className="h-48 relative">
                            <img
                                src={m?.image}
                                alt={m?.title}
                                className="h-48 w-full object-cover rounded-tl-2xl rounded-tr-2xl"
                            />
                            <span className="absolute -bottom-2.5 right-3 badge bg-gradient-to-r from-[#FFAE00] to-[#FF8A00] text-white border-none">
                                {m.category}
                            </span>
                        </div>
                        <div className="p-3 space-y-2">
                            <h2 className="card-title font-semibold">
                                {m?.title}
                            </h2>
                            <div className="rating">
                                {[1, 2, 3, 4, 5].map((value) => (
                                    <input
                                        key={value}
                                        type="radio"
                                        name={`rating`}
                                        className="mask mask-star-2 bg-orange-400"
                                        aria-label={`${value} star${
                                            value > 1 ? "s" : ""
                                        }`}
                                        value={value}
                                        checked={value === m.averageRating}
                                        readOnly
                                    />
                                ))}
                            </div>
                            <p className="text-base text-black flex items-center gap-1">
                                ৳<span>{m?.price}</span>
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
            <div className="flex items-center justify-center">
                {meals.length > 12 && (
                    <button
                        onClick={() => setShowAll(!showAll)}
                        className="btn bg-gradient-to-r from-[#FFAE00] to-[#FF8A00] text-white border-none text-center"
                    >
                        {showAll ? "See Less" : "See More"}
                    </button>
                )}
            </div>
        </div>
    );
};

export default MealsCategory;
