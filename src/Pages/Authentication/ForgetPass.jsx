import React, { useState } from "react";
import { IoArrowUndo } from "react-icons/io5";
import { Link, useNavigate } from "react-router";
import useAxios from "../../Hooks/useAxios";

const ForgetPass = () => {
    const axiosInstance = useAxios();
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleEmail = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        setError("");
        if (email === "") {
            return setError("Email is required");
        }
        setError("");
        const data = { email };
        try {
            const res = await axiosInstance.post(
                "/users/forget-password",
                data
            );
            if (res.data.success === true) {
                navigate("/verify-otp", { state: { email } });
            }
        } catch (error) {
            setError(error.response.data.message);
            console.log(error);
        }
    };
    return (
        <div className="flex flex-col items-center justify-center max-w-7xl mx-auto mt-40 gap-5">
            <Link
                to="/auth"
                className="btn bg-white border border-primary text-primary transition-all hover:bg-gradient-to-r from-[#FFAE00] to-[#FF8A00] hover:border-none hover:text-white"
            >
                <IoArrowUndo />
                Back to Login
            </Link>
            <div className="bg-white max-w-5xl mx-auto p-10 lg:p-12 rounded-3xl">
                <div className="flex flex-col items-center justify-center gap-5">
                    <div>
                        <h2 className="text-2xl font-bold text-center">
                            Forgotten Password?
                        </h2>
                        <p>No worries, we’ll send you reset instructions</p>
                    </div>
                    <form
                        onSubmit={handleEmail}
                        className="space-y-3 flex flex-col items-center justify-center gap-3"
                    >
                        <div className="relative w-full">
                            <input
                                type="email"
                                placeholder=""
                                name="email"
                                className="w-full p-3 border-b-2 focus:outline-none focus:border-b-primary focus:placeholder:hidden transition-all peer"
                            />
                            <label
                                className="
                                    absolute left-3 text-gray-500 pointer-events-none 
                                    transition-all duration-200
                                    top-1/2 -translate-y-1/2 text-base
                                    peer-focus:top-0
                                    peer-focus:-translate-y-0
                                    peer-focus:text-sm
                                    peer-focus:text-primary
                                    peer-not-placeholder-shown:top-0
                                    peer-not-placeholder-shown:-translate-y-0
                                    peer-not-placeholder-shown:text-sm
                                "
                            >
                                Email
                            </label>
                            {error !== "" && (
                                <p className="text-red-500 text-sm mt-1">
                                    {error}
                                </p>
                            )}
                        </div>
                        <button
                            type="submit"
                            className="btn w-fit bg-gradient-to-r from-[#FFAE00] to-[#FF8A00] text-white py-3 rounded-lg"
                        >
                            Continue
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ForgetPass;
