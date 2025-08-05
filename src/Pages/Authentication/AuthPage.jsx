import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { FaFacebook, FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Facebook from '../../assets/facebook.png'

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log(isLogin ? "Login Data:" : "Register Data:", data);
    };

    const slideAnimation = {
        initial: { opacity: 0, x: 50 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -50 },
        transition: { duration: 0.4 },
    };

    return (
        <div className="flex items-center justify-center min-h-screen p-4">
            <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white rounded-2xl shadow-lg overflow-hidden">
                {/* Left Illustration */}
                <div className="hidden md:flex md:w-1/2 items-center justify-center bg-white p-6">
                <AnimatePresence mode="wait">
                    {isLogin ? (
                    <motion.img
                        key="login-illustration"
                        {...slideAnimation}
                        src="https://illustrations.popsy.co/gray/laptop-working.svg"
                        alt="Login Illustration"
                        className="w-80"
                    />
                    ) : (
                    <motion.img
                        key="register-illustration"
                        {...slideAnimation}
                        src="https://illustrations.popsy.co/gray/sign-up.svg"
                        alt="Register Illustration"
                        className="w-80"
                    />
                    )}
                </AnimatePresence>
                </div>

                {/* Right Form */}
                <div className="flex-1 p-8 flex items-center justify-center">
                <AnimatePresence mode="wait">
                    {isLogin ? (
                    <motion.div
                        key="login-form"
                        {...slideAnimation}
                        className="w-full max-w-sm"
                    >
                        <h2 className="text-2xl font-bold mb-6">Login</h2>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <input
                            {...register("email", { required: "Email is required" })}
                            type="email"
                            placeholder="Email"
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                            {errors.email && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.email.message}
                            </p>
                            )}
                        </div>
                        <div>
                            <input
                            {...register("password", { required: "Password is required" })}
                            type="password"
                            placeholder="Password"
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                            {errors.password && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.password.message}
                            </p>
                            )}
                        </div>
                        {/* <div className="flex items-center gap-2">
                            <input type="checkbox" className="w-4 h-4" />
                            <span className="text-sm text-gray-600">Remember me</span>
                        </div> */}
                        <button
                            type="submit"
                            className="w-full btn bg-primary text-white py-3 rounded-lg"
                        >
                            Login
                        </button>
                        </form>

                        {/* Social Login */}
                        <p className="text-center text-sm my-4">Or login with</p>
                        <div className="flex justify-center items-center gap-3">
                            <button className="w-10 h-10 rounded-full cursor-pointer">
                                <FaGithub size={35} className="w-fit mx-auto" />
                            </button>
                            <button className="w-10 h-10 rounded-full group cursor-pointer shadow-2xl bg-base-100 p-0">
                                <FcGoogle size={35} className="w-fit mx-auto" />
                            </button>
                            <button className="w-10 h-10 border text-white rounded-full">
                                <img src={Facebook} alt="" className="w-fit" />
                            </button>
                        </div>

                        <p className="text-center text-sm mt-4">
                        Don’t have an account?{" "}
                        <button
                            onClick={() => setIsLogin(false)}
                            className="text-primary hover:underline cursor-pointer"
                        >
                            Create an account
                        </button>
                        </p>
                    </motion.div>
                    ) : (
                    <motion.div
                        key="register-form"
                        {...slideAnimation}
                        className="w-full max-w-sm"
                    >
                        <h2 className="text-2xl font-bold mb-6">Sign Up</h2>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <input
                            {...register("name", { required: "Name is required" })}
                            type="text"
                            placeholder="Your Name"
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                            {errors.name && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.name.message}
                            </p>
                            )}
                        </div>
                        <div>
                            <input
                            {...register("email", { required: "Email is required" })}
                            type="email"
                            placeholder="Email"
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                            {errors.email && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.email.message}
                            </p>
                            )}
                        </div>
                        <div>
                            <input
                            {...register("password", { required: "Password is required" })}
                            type="password"
                            placeholder="Password"
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                            {errors.password && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.password.message}
                            </p>
                            )}
                        </div>
                        <button
                            type="submit"
                            className="w-full btn bg-primary text-white py-3 rounded-lg"
                        >
                            Sign Up
                        </button>
                        </form>

                        {/* Social Register */}
                        <p className="text-center text-sm my-4">Or sign up with</p>
                        <div className="flex justify-center gap-3">
                            <button className="w-10 h-10 rounded-full cursor-pointer">
                                <FaGithub size={35} className="w-fit mx-auto" />
                            </button>
                            <button className="w-10 h-10 rounded-full group cursor-pointer shadow-2xl bg-base-100 p-0">
                                <FcGoogle size={35} className="w-fit mx-auto" />
                            </button>
                            <button className="w-10 h-10 border text-white rounded-full">
                                <img src={Facebook} alt="" className="w-fit" />
                            </button>
                        </div>

                        <p className="text-center text-sm mt-4">
                            Already have an account?{" "}
                            <button
                                onClick={() => setIsLogin(true)}
                                className="text-primary hover:underline cursor-pointer"
                            >
                                Login
                            </button>
                        </p>
                    </motion.div>
                    )}
                </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
