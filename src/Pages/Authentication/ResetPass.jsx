import React, { useState } from "react";
import { IoArrowUndo } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router";
import useAxios from "../../Hooks/useAxios";
import useAuthContext from "../../Hooks/useAuthContext";

const ResetPass = () => {
    const { updateUserPassword } = useAuthContext();
    const [error, setError] = useState("");
    const axiosInstance = useAxios();
    const location = useLocation();
    // const navigate = useNavigate();

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setError("");
        const email = location.state.data.email;
        const newPassword = e.target.newPassword.value;
        const confirmPassword = e.target.confirmPassword.value;

        if (!newPassword || !confirmPassword) {
            return setError("Password is required");
        }

        if (newPassword !== confirmPassword) {
            return setError("Passwords do not match");
        }
        
        try {
            // 1️⃣ Update password in Firebase
            await updateUserPassword(newPassword);

            // 2️⃣ Update password in your backend
            const data = { email, password: newPassword };
            const res = await axiosInstance.post("/users/reset-password", data);

            if (res.data?.success) {
                // navigate("/login");
                console.log("Password reset successful");
            }
        } catch (error) {
            console.error(error);

            // Firebase errors usually come with `code`
            if (error.code) {
                setError(error.message);
            } else {
                setError(
                    error.response?.data?.message || "Something went wrong"
                );
            }
        }
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
                                    peer-focus:-translate-y-3
                                    peer-focus:text-sm
                                    peer-focus:text-primary
                                    peer-not-placeholder-shown:top-0
                                    peer-not-placeholder-shown:-translate-y-3
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
                                    peer-focus:-translate-y-3
                                    peer-focus:text-sm
                                    peer-focus:text-primary
                                    peer-not-placeholder-shown:top-0
                                    peer-not-placeholder-shown:-translate-y-3
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
