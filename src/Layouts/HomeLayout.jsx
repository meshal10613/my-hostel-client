import React from "react";
import Navbar from "../Components/Shared/Navbar";
import { Outlet } from "react-router";
import Footer from "../Components/Shared/Footer";

const HomeLayout = () => {
    return (
        <div className="">
            <Navbar />
            <div className="min-h-[calc(100vh-343px)]">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default HomeLayout;
