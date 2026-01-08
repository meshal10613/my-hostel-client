import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import useAuthContext from "../../Hooks/useAuthContext";
import StripeContent from "./StripeContent";
import SSLCommerzContent from "./SSLCommerzContent";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useParams } from "react-router";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import Stripe from "./Stripe";

const packages = [
    {
        id: 1,
        name: "Silver",
        price: 2999,
        benefits: [
            "1️⃣ 2 Meals / Day",
            "2️⃣ Basic Support",
            "3️⃣ Access to Daily Menu",
        ],
        logo: "https://i.ibb.co.com/LhRLy4Bt/1.png",
        location: "silver",
    },
    {
        id: 2,
        name: "Gold",
        price: 3999,
        benefits: [
            "1️⃣ 3 Meals / Day",
            "2️⃣ Basic Support",
            "3️⃣ Access to Daily Menu",
        ],
        logo: "https://i.ibb.co.com/MDZT9JXf/2.png",
        location: "gold",
    },
    {
        id: 3,
        name: "Platinum",
        price: 4999,
        benefits: [
            "1️⃣ 3 Meals / Day",
            "2️⃣ 3 Basic Support",
            "3️⃣ Access to Daily Menu",
        ],
        logo: "https://i.ibb.co.com/60Tyy732/3.png",
        location: "platinum",
    },
];

const Checkout = () => {
    const { packageName } = useParams();
    const [method, setMethod] = useState("Stripe");
    const [isLoading, setIsLoading] = useState(false);
    const [paymentTrigger, setPaymentTrigger] = useState(null);
    const modalRef = useRef(null);
    const { user } = useAuthContext();
    const axiosSecure = useAxiosSecure();
    const newPackage = packages.find((p) => p.location === packageName);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    //? SSLCommerz
    const onSubmit = async (data) => {
        setIsLoading(true);
        const info = {
            ...data,
            paymentMethod: "SSLCommerz",
            packageName: newPackage.name,
            benefits: newPackage.benefits,
            price: newPackage.price,
            userName: user?.displayName,
            userEmail: user?.email,
            status: "Pending",
        };

        const res = await axiosSecure.post("/ssl/create-payment", info);
        console.log(res.data);
        if (res.status === 200 && res.data.status === "SUCCESS") {
            window.location.replace(res.data.GatewayPageURL);
        } else {
            Swal.fire({
                icon: "error",
                title: "Sorry!",
                text: `${res.data.message}`,
                confirmButtonColor: "#FFAE00",
            });
        }
    };

    //? Stripe
    const handlePayment = (data) => {
        const info = {
            paymentMethod: data,
            packageName: newPackage.name,
            benefits: newPackage.benefits,
            price: newPackage.price * 100,
            userName: user?.displayName,
            userEmail: user?.email,
            status: "Pending",
        };
        setPaymentTrigger(info);
        if (modalRef.current) {
            modalRef.current.show(); // call a function exposed by the child
        }
    };

    const fadeIn = {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    };

    return (
        <div className="w-full min-h-screen p-4 2xl:px-[7%] md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-6 bg-base-200">
            {/* Left Section */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0, transition: { duration: 0.4 } }}
                className="lg:col-span-8 bg-base-100 p-6 rounded-xl shadow-lg border border-base-300 space-y-6"
            >
                {/* Payment Method Section */}
                <motion.div {...fadeIn}>
                    <h2 className="text-3xl font-bold mb-2">
                        Select Payment Method
                    </h2>
                    <p className="text-sm mb-4 text-base-content/70">
                        Choose a payment method to continue with your checkout.
                    </p>

                    <div className="flex  gap-3 mt-4">
                        <label className="flex items-center gap-3 cursor-pointer hover:bg-base-200 p-2 rounded-lg transition">
                            <input
                                type="radio"
                                autoFocus={false}
                                name="payment"
                                value="Stripe"
                                checked={method === "Stripe"}
                                onChange={() => setMethod("Stripe")}
                                className="radio radio-primary"
                            />
                            <span className="font-medium">Stripe</span>
                        </label>

                        <label className="flex items-center gap-3 cursor-pointer hover:bg-base-200 p-2 rounded-lg transition">
                            <input
                                type="radio"
                                autoFocus={false}
                                name="payment"
                                value="SSLCommerz"
                                checked={method === "SSLCommerz"}
                                onChange={() => setMethod("SSLCommerz")}
                                className="radio radio-primary"
                            />
                            <span className="font-medium">SSLCommerz</span>
                        </label>
                    </div>
                </motion.div>

                {/* Divider */}
                <div className="divider"></div>

                {/* Dynamic Description */}
                <motion.div {...fadeIn}>
                    {method === "Stripe" && <StripeContent />}
                    {method === "SSLCommerz" && <SSLCommerzContent />}
                </motion.div>
            </motion.div>

            {/* Right Section */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0, transition: { duration: 0.4 } }}
                className="w-full lg:col-span-4 h-fit space-y-4"
            >
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{
                        opacity: 1,
                        x: 0,
                        transition: { duration: 0.4 },
                    }}
                    className="w-full lg:col-span-4 bg-base-100 p-6 rounded-xl shadow-lg border border-base-300 h-fit space-y-4"
                >
                    <motion.h2
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, transition: { delay: 0.1 } }}
                        className="text-xl font-semibold mb-2"
                    >
                        Payment Summary
                    </motion.h2>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, transition: { delay: 0.1 } }}
                        className="space-y-2"
                    >
                        <p className="flex items-center justify-between">
                            Package: <strong>Gold</strong>
                        </p>
                        <p className="flex items-center justify-between">
                            Total: <strong>৳{newPackage?.price || 0}</strong>
                        </p>
                        <p className="flex items-center justify-between">
                            Discount:{" "}
                            <strong>৳{newPackage?.discount || 0}</strong>
                        </p>
                        <p className="flex items-center justify-between">
                            Tax: <strong>৳{newPackage?.tax || 0}</strong>
                        </p>
                        <div className="divider"></div>
                        <p className="flex items-center justify-between">
                            Grand Total:{" "}
                            <strong>৳{newPackage?.price || 0}</strong>
                        </p>
                    </motion.div>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{
                        opacity: 1,
                        x: 0,
                        transition: { duration: 0.4 },
                    }}
                    className="w-full lg:col-span-4 bg-base-100 p-6 rounded-xl shadow-lg border border-base-300 h-fit space-y-4"
                >
                    <motion.h2
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, transition: { delay: 0.1 } }}
                        className="text-xl font-semibold mb-4"
                    >
                        Complete Your Payment
                    </motion.h2>

                    {method === "Stripe" && (
                        <motion.div {...fadeIn} className="space-y-4">
                            <p className="text-sm text-base-content/70">
                                Stripe checkout will appear here.
                            </p>
                            <button
                                onClick={() => handlePayment(method)}
                                className="btn bg-gradient-to-r from-[#FFAE00] to-[#FF8A00] text-white border-none w-full shadow-md hover:scale-[1.03] transition"
                            >
                                Pay with Stripe
                            </button>
                        </motion.div>
                    )}

                    {method === "SSLCommerz" && (
                        <motion.form
                            {...fadeIn}
                            onSubmit={handleSubmit(onSubmit)}
                            className="space-y-4"
                        >
                            {/* Address */}
                            <div className="relative w-full">
                                <input
                                    type="text"
                                    {...register("address", {
                                        required: true,
                                    })}
                                    className="w-full p-3 border-b-2 focus:outline-none focus:border-b-primary focus:placeholder:hidden transition-all peer"
                                />
                                <label
                                    className={`
                                        absolute left-3 wrap-break-word text-gray-500
                                        pointer-events-none 
                                        transition-all duration-300
                                        top-1/2 -translate-y-1/2 text-base
                                        peer-focus:top-0
                                        peer-focus:-translate-y-3
                                        peer-focus:text-sm
                                        peer-focus:text-primary
                                        peer-not-placeholder-shown:top-0
                                        peer-not-placeholder-shown:-translate-y-0
                                        peer-not-placeholder-shown:text-sm
                                    `}
                                >
                                    Address *
                                </label>
                                {errors.address && (
                                    <p className="text-red-500 text-sm">
                                        Address is required
                                    </p>
                                )}
                            </div>

                            {/* City */}
                            <div className="relative w-full">
                                <input
                                    type="text"
                                    {...register("city", {
                                        required: true,
                                    })}
                                    className="w-full p-3 border-b-2 focus:outline-none focus:border-b-primary focus:placeholder:hidden transition-all peer"
                                />
                                <label
                                    className={`
                                        absolute left-3 wrap-break-word text-gray-500
                                        pointer-events-none 
                                        transition-all duration-300
                                        top-1/2 -translate-y-1/2 text-base
                                        peer-focus:top-0
                                        peer-focus:-translate-y-3
                                        peer-focus:text-sm
                                        peer-focus:text-primary
                                        peer-not-placeholder-shown:top-0
                                        peer-not-placeholder-shown:-translate-y-0
                                        peer-not-placeholder-shown:text-sm
                                    `}
                                >
                                    Dhaka *
                                </label>
                                {errors.city && (
                                    <p className="text-red-500 text-sm">
                                        City is required
                                    </p>
                                )}
                            </div>

                            {/* Country */}
                            <div className="relative w-full">
                                <input
                                    type="text"
                                    {...register("country", {
                                        required: true,
                                    })}
                                    className="w-full p-3 border-b-2 focus:outline-none focus:border-b-primary focus:placeholder:hidden transition-all peer"
                                />
                                <label
                                    className={`
                                        absolute left-3 wrap-break-word text-gray-500
                                        pointer-events-none 
                                        transition-all duration-300
                                        top-1/2 -translate-y-1/2 text-base
                                        peer-focus:top-0
                                        peer-focus:-translate-y-3
                                        peer-focus:text-sm
                                        peer-focus:text-primary
                                        peer-not-placeholder-shown:top-0
                                        peer-not-placeholder-shown:-translate-y-0
                                        peer-not-placeholder-shown:text-sm
                                    `}
                                >
                                    Country *
                                </label>
                                {errors.country && (
                                    <p className="text-red-500 text-sm">
                                        Country is required
                                    </p>
                                )}
                            </div>

                            {/* Post Code */}
                            <div className="relative w-full">
                                <input
                                    type="number"
                                    {...register("postcode", {
                                        required: true,
                                    })}
                                    className="w-full p-3 border-b-2 focus:outline-none focus:border-b-primary peer"
                                />
                                <label
                                    className={`
                                        absolute left-3 wrap-break-word text-gray-500
                                        pointer-events-none 
                                        transition-all duration-300
                                        top-1/2 -translate-y-1/2 text-base
                                        peer-focus:top-0
                                        peer-focus:-translate-y-2
                                        peer-focus:text-sm
                                        peer-focus:text-primary
                                        peer-not-placeholder-shown:top-0
                                        peer-not-placeholder-shown:-translate-y-0
                                        peer-not-placeholder-shown:text-sm
                                    `}
                                >
                                    Post Code *
                                </label>
                                {errors.country && (
                                    <p className="text-red-500 text-sm">
                                        Post code is required
                                    </p>
                                )}
                            </div>

                            {/* Phone Number */}
                            <div className="relative w-full">
                                <input
                                    type="number"
                                    {...register("phone", {
                                        required: true,
                                    })}
                                    className="w-full p-3 border-b-2 focus:outline-none focus:border-b-primary focus:placeholder:hidden transition-all peer"
                                />
                                <label
                                    className="
                                        absolute left-3 text-gray-500 pointer-events-none 
                                        transition-all duration-300
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
                                    Phone number *
                                </label>
                                {errors.country && (
                                    <p className="text-red-500 text-sm">
                                        Phone number is required
                                    </p>
                                )}
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                className="btn bg-gradient-to-r from-[#FFAE00] to-[#FF8A00] text-white border-none w-full shadow-md hover:scale-[1.03] transition"
                            >
                                {isLoading ? (
                                    <div className="loading loading-spinner"></div>
                                ) : (
                                    "Pay with SSLCommerz"
                                )}
                            </button>
                        </motion.form>
                    )}
                </motion.div>
            </motion.div>

            <Stripe ref={modalRef} paymentTrigger={paymentTrigger} />
        </div>
    );
};

export default Checkout;
