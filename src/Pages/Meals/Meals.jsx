import React, { useState } from "react";
import useAxios from "../../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { FaSearch, FaStar } from "react-icons/fa";
import { Link } from "react-router";
import Loading from "../../Components/Shared/Loading";

const Meals = () => {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    // const [minPrice, setMinPrice] = useState("");
    // const [maxPrice, setMaxPrice] = useState("");
    const axios = useAxios();
    const { data: meals = [], isLoading } = useQuery({
        queryKey: ["meals", search, category],
        queryFn: async () => {
            const res = await axios.get(`/meals`, {
                params: {
                    search,
                    category,
                    // minPrice,
                    // maxPrice,
                },
            });
            return res.data;
        },
    });

    const handleSearch = (e) => {
        e.preventDefault();
        const search = e.target.search.value;
        setSearch(search);
    };
    return (
        <div className="px-0 2xl:px-[7%]">
            {/* Filters Section */}
            <div className="flex items-center justify-between gap-4 m-5">
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
                    className="select select-bordered w-32"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="">All Categories</option>
                    <option className="hover:bg-primary hover:text-white" value="Breakfast">Breakfast</option>
                    <option className="hover:bg-primary hover:text-white" value="Lunch">Lunch</option>
                    <option className="hover:bg-primary hover:text-white" value="Dinner">Dinner</option>
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
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 p-10 gap-5">
                {meals.map((m) => (
                    <div
                        key={m?.id}
                        className="border-2 border-base-200 rounded-2xl p-5 bg-white space-y-3"
                    >
                        <div className="relative">
                            <img
                                src={m?.image}
                                alt={m?.title}
                                className="h-60 w-full object-cover rounded-md"
                            />
                            <span className="absolute top-2 left-2 bg-white text-yellow-400 flex items-center gap-1 p-1 rounded-md">
                                <FaStar />
                                {m.rating}
                            </span>
                        </div>
                        <h2 className="text-2xl font-semibold">{m?.title}</h2>
                        <p className="text-base text-black flex items-center gap-1">
                            ৳<span>{m?.price}</span>
                        </p>
                        <Link
                            to={`/meal/${m.id}`}
                            className="btn bg-gradient-to-r from-[#FFAE00] to-[#FF8A00] text-white border-none w-full"
                        >
                            Details
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Meals;
