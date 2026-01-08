import React, { useState } from "react";
import useAxios from "../../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { FaSearch, FaStar } from "react-icons/fa";
import { Link } from "react-router";
import Loading from "../../Components/Shared/Loading";
import useAuthContext from "../../Hooks/useAuthContext";

const Meals = () => {
    const { search, setSearch } = useAuthContext();
    // const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    // const [minPrice, setMinPrice] = useState("");
    // const [maxPrice, setMaxPrice] = useState("");
    const axios = useAxios();
    const { data: meals = [], isLoading } = useQuery({
        queryKey: ["meals", search, category],
        queryFn: async () => {
            const res = await axios.get(`/meals`, {
                params: {
                    ...(search && { search }),
                    ...(category && { category }),
                },
            });
            return res.data.data;
        },
    });

    const handleSearch = (e) => {
        e.preventDefault();
        const search = e.target.search.value;
        setSearch(search);
    };
    return (
        <div className="container mx-auto px-4 py-8">
            {/* Filters Section */}
            <div className="flex items-center justify-between gap-4 my-5">
                <form
                    onSubmit={handleSearch}
                    className="flex items-center gap-3"
                >
                    {/* Search */}
                    <input
                        type="text"
                        placeholder="Search meals..."
                        defaultValue={search}
                        name="search"
                        // onChange={(e) => setSearch(e.target.value)}
                        className="input input-bordered w-fit"
                    />
                    <button
                        type="submit"
                        className="btn bg-gradient-to-r from-[#FFAE00] to-[#FF8A00] text-white border-none"
                    >
                        <FaSearch />
                    </button>
                </form>

                {/* Category */}
                <select
                    className="select select-bordered w-40"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="">All Categories</option>
                    <option
                        className="hover:bg-primary hover:text-white"
                        value="Breakfast"
                    >
                        Breakfast
                    </option>
                    <option
                        className="hover:bg-primary hover:text-white"
                        value="Lunch"
                    >
                        Lunch
                    </option>
                    <option
                        className="hover:bg-primary hover:text-white"
                        value="Dinner"
                    >
                        Dinner
                    </option>
                </select>

                {/* Min Price
                <input
                type="number"
                placeholder="Min Price"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="input input-bordered w-full"
                />

                {/* Max Price */}
                {/* <input
                type="number"
                placeholder="Max Price"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="input input-bordered w-full"
                /> */}
            </div>
            {isLoading && <Loading />}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-6 w-fit mx-auto">
                {meals.map((m) => (
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
                            <span className="absolute -bottom-2.5 right-3 badge bg-gradient-to-r from-[#FFAE00] to-[#FF8A00] text-white border-none">{m.category}</span>
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
        </div>
    );
};

export default Meals;
