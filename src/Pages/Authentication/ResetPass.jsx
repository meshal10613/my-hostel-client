import React, { useState } from "react";
import { IoArrowUndo } from "react-icons/io5";
import { Link, useLocation } from "react-router";

const ResetPass = () => {
    const [error, setError] = useState("");
    const location = useLocation();

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setError("");
        const email = location.state.data.email;
        const newPassword = e.target.newPassword.value;
        const confirmPassword = e.target.confirmPassword.value;
        if (newPassword !== confirmPassword) {
            return setError("Passwords do not match");
        }
        const data = { email, password: newPassword };
		console.log(data)
        // try {
        // 	const res = await axiosInstance.post(
        // 		"/users/reset-password",
        // 		data
        // 	);
        // 	if (res.data.success === true) {
        // 		navigate("/login");
        // 	}
        // } catch (error) {
        // 	setError(error.response.data.message);
        // 	console.log(error);
        // }
    };

    return (
        <div className="flex flex-col items-center justify-center max-w-7xl mx-auto mt-40 gap-5">
            <Link
                to="/verify-otp"
                className="btn bg-white border border-primary text-primary transition-all hover:bg-gradient-to-r from-[#FFAE00] to-[#FF8A00] hover:border-none hover:text-white"
            >
                <IoArrowUndo />
                Back
            </Link>

            <div className="bg-white w-md mx-auto p-10 lg:p-12 rounded-3xl">
                <div className="flex flex-col items-center justify-center gap-5">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold">Reset Password</h2>
                        <p className="text-gray-500">
                            Enter your new password below
                        </p>
                    </div>

                    <form
                        onSubmit={handleResetPassword}
                        className="space-y-4 flex flex-col items-center justify-center w-full max-w-md"
                    >
                        {/* New Password */}
                        <div className="relative w-full">
                            <input
                                type="text"
                                placeholder=""
                                name="newPassword"
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
                                New Password
                            </label>
                        </div>

                        {/* Confirm Password */}
                        <div className="relative w-full">
                            <input
                                type="text"
                                placeholder=""
                                name="confirmPassword"
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
                                Confirm Password
                            </label>
                        </div>
                        {error !== "" && (
                            <p className="text-red-500 text-sm mt-1">{error}</p>
                        )}
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

export default ResetPass;
