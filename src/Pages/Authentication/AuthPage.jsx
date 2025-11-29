import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Facebook from "../../assets/facebook.png";
import LoginAnime from "../../assets/animation/Login.json";
import Lottie from "lottie-react";
import { Link, useLocation, useNavigate } from "react-router";
import { IoArrowUndo } from "react-icons/io5";
import axios from "axios";
import useAuthContext from "../../Hooks/useAuthContext";
import Swal from "sweetalert2";
import useAxios from "../../Hooks/useAxios";

export default function AuthPage() {
    const { user, registerUser, updateUserProfile, setUser, loginUser } =
        useAuthContext();
    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const axiosInstance = useAxios();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.from?.pathname || "/";

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        if (user) {
            navigate(from);
        }
    }, [user, navigate, from]);

    const onSubmit = async (data) => {
        setIsLoading(true);
        if (isLogin) {
            delete data.name;
            const email = data.email;
            const password = data.password;
            loginUser(email, password)
                .then(async () => {
                    // const user = result.user;
                    // const lastSignInTime = new Date(user?.metadata?.lastSignInTime).toLocaleString();
                    const serverData = {
                        email: data.email,
                        // lastSignInTime
                    };
                    const userRes = await axiosInstance.post(
                        "/users",
                        serverData
                    );
                    if (userRes.status === 200 && userRes.statusText === "OK") {
                        navigate(from);
                        setIsLoading(false);
                        Swal.fire({
                            icon: "success",
                            title: "Congratulations!",
                            text: `Login successfully`,
                            confirmButtonColor: "#FFAE00",
                        });
                    }
                })
                .catch((error) => {
                    setIsLoading(false);
                    Swal.fire({
                        icon: "error",
                        title: "Sorry!",
                        text: `${error.message}`,
                        confirmButtonColor: "#FFAE00",
                    });
                });
        } else {
            const formData = new FormData();
            formData.append("image", data.image[0]);
            const uploadKey = import.meta.env.VITE_imgbb_apikey;
            const res = await axios.post(
                `https://api.imgbb.com/1/upload?key=${uploadKey}`,
                formData,
                {
                    headers: {
                        "content-type": "multipart/form-data",
                    },
                }
            );
            registerUser(data.email, data.password)
                .then(async (result) => {
                    const user = result.user;
                    const creationTime = new Date(
                        user?.metadata?.creationTime
                    ).toLocaleString();
                    const lastSignInTime = new Date(
                        user?.metadata?.lastSignInTime
                    ).toLocaleString();
                    const updateData = {
                        displayName: data.name,
                        photoURL: res.data.data.url,
                    };
                    const serverData = {
                        displayName: data.name,
                        email: result.user.email,
                        photoURL: res.data.data.url,
                        role: "user",
                        badge: "Bronze",
                        creationTime,
                        lastSignInTime,
                    };
                    updateUserProfile(updateData)
                        .then(async () => {
                            setUser({ ...user, ...updateData });
                            const userRes = await axiosInstance.post(
                                "/users",
                                serverData
                            );
                            if (
                                userRes.status === 200 &&
                                userRes.statusText === "OK"
                            ) {
                                navigate(from);
                                setIsLoading(false);
                                Swal.fire({
                                    icon: "success",
                                    title: "Congratulations!",
                                    text: `Sign up successfully`,
                                    confirmButtonColor: "#FFAE00",
                                });
                            }
                        })
                        .catch(() => {
                            setUser(user);
                        });
                })
                .catch((error) => {
                    Swal.fire({
                        icon: "error",
                        title: "Sorry!",
                        text: `${error.message}`,
                        confirmButtonColor: "#FFAE00",
                    });
                });
        }
    };

    const handleGithub = () => {
        Swal.fire({
            title: "Sorry!",
            text: "Github hasn't implementd yet",
            icon: "question",
            confirmButtonColor: "#FFAE00",
        });
    };

    const handleGoogle = () => {
        Swal.fire({
            title: "Sorry!",
            text: "Google hasn't implementd yet",
            icon: "question",
            confirmButtonColor: "#FFAE00",
        });
    };

    const handleFacebook = () => {
        Swal.fire({
            title: "Sorry!",
            text: "Facebook hasn't implementd yet",
            icon: "question",
            confirmButtonColor: "#FFAE00",
        });
    };

    const slideAnimation = {
        initial: { opacity: 0, x: 50 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -50 },
        transition: { duration: 0.4 },
    };

    return (
        <div className="flex flex-col justify-center items-center min-h-screen p-4 gap-5">
            <Link
                to="/"
                className="btn bg-white border border-primary text-primary transition-all hover:bg-gradient-to-r from-[#FFAE00] to-[#FF8A00] hover:border-none hover:text-white"
            >
                <IoArrowUndo />
                Back to Home
            </Link>
            <div className="flex flex-col md:flex-row w-full mx-auto max-w-4xl bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="hidden md:flex md:w-1/2 items-center justify-center bg-white p-6">
                    <AnimatePresence mode="wait">
                        <Lottie
                            animationData={LoginAnime}
                            className="w-fit mx-auto"
                        />
                    </AnimatePresence>
                </div>

                <div className="flex-1 p-8 flex items-center justify-center">
                    <AnimatePresence mode="wait">
                        {isLogin ? (
                            // Login Form
                            <motion.div
                                key="login-form"
                                {...slideAnimation}
                                className="w-full max-w-sm"
                            >
                                <h2 className="text-2xl font-bold mb-6">
                                    Login
                                </h2>
                                <form
                                    onSubmit={handleSubmit(onSubmit)}
                                    className="space-y-4"
                                >
                                    <div>
                                        <input
                                            {...register("email", {
                                                required: "Email is required",
                                            })}
                                            type="email"
                                            placeholder="Email"
                                            className="w-full p-3 border rounded-lg focus:outline-none focus:border-primary"
                                        />
                                        {errors.email && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors.email.message}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <input
                                            {...register("password", {
                                                required:
                                                    "Password is required",
                                            })}
                                            type="password"
                                            placeholder="Password"
                                            className="w-full p-3 border rounded-lg focus:outline-none focus:border-primary"
                                        />
                                        {errors.password && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors.password.message}
                                            </p>
                                        )}
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                className="w-4 h-4"
                                            />
                                            <span className="text-sm text-gray-600">
                                                Remember me
                                            </span>
                                        </div>
                                        <Link
                                            to="/forget-pass"
                                            className="link link-hover hover:text-primary"
                                        >
                                            Forget Password?
                                        </Link>
                                    </div>

                                    <button
                                        type="submit"
                                        className={`btn w-full bg-gradient-to-r from-[#FFAE00] to-[#FF8A00] text-white py-3 rounded-lg
                                        ${
                                            isLoading
                                                ? "cursor-not-allowed"
                                                : "cursor-pointer"
                                        }`}
                                    >
                                        {isLoading ? (
                                            <div className="loading loading-spinner"></div>
                                        ) : (
                                            "Login"
                                        )}
                                    </button>
                                </form>
                                {/* Social Login */}
                                <p className="text-center text-sm my-4">
                                    Or login with
                                </p>
                                <div className="flex justify-center items-center gap-3">
                                    <button
                                        onClick={handleGithub}
                                        className="w-10 h-10 rounded-full cursor-pointer"
                                    >
                                        <FaGithub
                                            size={35}
                                            className="w-fit mx-auto"
                                        />
                                    </button>
                                    <button
                                        onClick={handleGoogle}
                                        className="w-10 h-10 rounded-full group cursor-pointer shadow-2xl bg-base-100 p-0"
                                    >
                                        <FcGoogle
                                            size={35}
                                            className="w-fit mx-auto"
                                        />
                                    </button>
                                    <button
                                        onClick={handleFacebook}
                                        className="w-10 h-10 border text-white rounded-full cursor-pointer"
                                    >
                                        <img
                                            src={Facebook}
                                            alt=""
                                            className="w-fit"
                                        />
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
                            // Register Form
                            <motion.div
                                key="register-form"
                                {...slideAnimation}
                                className="w-full max-w-sm"
                            >
                                <h2 className="text-2xl font-bold mb-6">
                                    Sign Up
                                </h2>
                                <form
                                    onSubmit={handleSubmit(onSubmit)}
                                    className="space-y-4"
                                >
                                    <div>
                                        <input
                                            {...register("image", {
                                                required: "Image is required",
                                            })}
                                            type="file"
                                            placeholder="Your Image"
                                            className="w-full file-inputltw1 p-2 border rounded-lg focus:outline-none  focus:border-primary"
                                        />
                                        {errors.image && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors.image.message}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <input
                                            {...register("name", {
                                                required: "Name is required",
                                            })}
                                            type="text"
                                            placeholder="Your Name"
                                            className="w-full p-2 border rounded-lg focus:outline-none focus:border-primary"
                                        />
                                        {errors.name && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors.name.message}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <input
                                            {...register("email", {
                                                required: "Email is required",
                                            })}
                                            type="email"
                                            placeholder="Email"
                                            className="w-full p-2 border rounded-lg focus:outline-none focus:border-primary"
                                        />
                                        {errors.email && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors.email.message}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <input
                                            {...register("password", {
                                                required:
                                                    "Password is required",
                                            })}
                                            type="password"
                                            placeholder="Password"
                                            className="w-full p-2 border rounded-lg focus:outline-none focus:border-primary"
                                        />
                                        {errors.password && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors.password.message}
                                            </p>
                                        )}
                                    </div>
                                    <button
                                        type="submit"
                                        className={`btn w-full bg-gradient-to-r from-[#FFAE00] to-[#FF8A00] text-white py-3 rounded-lg
                                        ${
                                            isLoading
                                                ? "cursor-not-allowed"
                                                : "cursor-pointer"
                                        }`}
                                    >
                                        {isLoading ? (
                                            <div className="loading loading-spinner"></div>
                                        ) : (
                                            "Signup"
                                        )}
                                    </button>
                                </form>

                                {/* Social Register */}
                                <p className="text-center text-sm my-2">
                                    Or sign up with
                                </p>
                                <div className="flex justify-center gap-3">
                                    <button
                                        onClick={handleGithub}
                                        className="w-10 h-10 rounded-full cursor-pointer"
                                    >
                                        <FaGithub
                                            size={35}
                                            className="w-fit mx-auto"
                                        />
                                    </button>
                                    <button
                                        onClick={handleGoogle}
                                        className="w-10 h-10 rounded-full group cursor-pointer shadow-2xl bg-base-100 p-0"
                                    >
                                        <FcGoogle
                                            size={35}
                                            className="w-fit mx-auto"
                                        />
                                    </button>
                                    <button
                                        onClick={handleFacebook}
                                        className="w-10 h-10 border text-white rounded-full cursor-pointer"
                                    >
                                        <img
                                            src={Facebook}
                                            alt=""
                                            className="w-fit"
                                        />
                                    </button>
                                </div>

                                <p className="text-center text-sm mt-2">
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
