import React, { useEffect, useState } from "react";
import "./Banner.css";
import Bowl from "../assets/foodBowl.png";

const Banner = () => {
    const [err, setErr] = useState(false);
    const [animate, setAnimate] = useState(false);
    const handleBannerSearch = (e) => {
        e.preventDefault();
        const banner = e.target.banner.value;
        if (!banner) {
            return setErr(true);
        }
        setErr(false);
    };

    useEffect(() => {
        // Trigger animation when component loads
        setAnimate(true);
    }, []);

    return (
        <div className="bg-gradient-to-r from-[#FFAE00] to-[#FF8A00] py-32 xl:py-40 pl-0 lg:pl-10 xl:pl-20 2xl:pl-32 relative overflow-hidden mb-10">
            <div className="flex flex-col items-center lg:items-baseline justify-baseline space-y-3 z-30">
                <h2 className="text-white text-5xl md:text-6xl font-semibold">
                    Are you starving?
                </h2>
                <p>
                    Within a few clicks, find meals that are accessible near you
                </p>
                <form
                    onSubmit={handleBannerSearch}
                    className="bg-white min-w-xs md:min-w-md max-w-2xl flex flex-row items-center gap-5 rounded-xl p-5 z-20"
                >
                    <input
                        type="text"
                        name="banner"
                        id=""
                        placeholder={
                            err
                                ? "Please Enter Your Meal...."
                                : "Search Your Meal"
                        }
                        className="flex-1 bg-white h-10 pl-3 focus:border-b-2 focus:outline-none focus:border-primary"
                    />
                    <button
                        type="submit"
                        className="btn bg-gradient-to-r from-[#FFAE00] to-[#FF8A00] text-white border-none"
                    >
                        Find Food
                    </button>
                </form>
            </div>
            <img src={Bowl} alt="Banner Image" className={`w-fit absolute rounded-full shadow-[0_0_60px_40px_rgba(255,255,255,0.4)] -bottom-60 -right-60 lg:hidden ${animate ? "slide-up-small" : ""} z-0`}/>
            <img
                src={Bowl}
                alt="Banner Image" className={`w-fit absolute rounded-full shadow-[0_0_60px_40px_rgba(255,255,255,0.4)] right-0 xl:right-20 hidden lg:block ${animate ? "slide-up" : ""}`}
            />
        </div>
    );
};

export default Banner;
