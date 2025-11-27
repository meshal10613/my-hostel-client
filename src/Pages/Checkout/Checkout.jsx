import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import useAuthContext from "../../Hooks/useAuthContext";
import StripeContent from "./StripeContent";
import SSLCommerzContent from "./SSLCommerzContent";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useParams } from "react-router";
import { useForm } from "react-hook-form";

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
    const { user } = useAuthContext();
    const axiosSecure = useAxiosSecure();
    const newPackage = packages.find((p) => p.location === packageName);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async(data) => {
        const info = {
            ...data,
            paymentMethod: "SSLCommerz",
            packageName: newPackage.name,
            benefits: newPackage.benefits,
            price: newPackage.price,
            userName: user.displayName,
            userEmail: user.email,
            status: "Pending",
        };

        const res = await axiosSecure.post("/ssl/create-payment", info);
        console.log(res.data);
        if (res.status === 200 && res.data.status === "SUCCESS") {
            window.location.replace(res.data.GatewayPageURL);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

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
                        className="text-xl font-semibold mb-2"
                    >
                        Complete Your Payment
                    </motion.h2>

                    {method === "Stripe" && (
                        <motion.div {...fadeIn} className="space-y-4">
                            <p className="text-sm text-base-content/70">
                                Stripe checkout will appear here.
                            </p>
                            <button
                                // onClick={() => handlePayment(method)}
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
                            <div>
                                <label className="block mb-1 font-medium">
                                    Address *
                                </label>
                                <input
                                    type="text"
                                    className="textarea w-full border focus:border-none px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                    placeholder="123 Street Name"
                                    {...register("address", {
                                        required: true,
                                    })}
                                />
                                {errors.address && (
                                    <p className="text-red-500 text-sm">
                                        Address is required
                                    </p>
                                )}
                            </div>

                            {/* City */}
                            <div>
                                <label className="block mb-1 font-medium">
                                    City *
                                </label>
                                <input
                                    type="text"
                                    className="input w-full border focus:border-none px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                    placeholder="Dhaka"
                                    {...register("city", {
                                        required: true,
                                    })}
                                />
                                {errors.city && (
                                    <p className="text-red-500 text-sm">
                                        City is required
                                    </p>
                                )}
                            </div>

                            {/* Country */}
                            <div>
                                <label className="block mb-1 font-medium">
                                    Country *
                                </label>
                                <input
                                    type="text"
                                    className="input w-full border focus:border-none px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                    placeholder="Bangladesh"
                                    {...register("country", {
                                        required: true,
                                    })}
                                />
                                {errors.country && (
                                    <p className="text-red-500 text-sm">
                                        Country is required
                                    </p>
                                )}
                            </div>

                            {/* Post Code */}
                            <div>
                                <label className="block mb-1 font-medium">
                                    Post Code *
                                </label>
                                <input
                                    type="number"
                                    className="input w-full border focus:border-none px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                    placeholder="1207"
                                    {...register("postcode", {
                                        required: true,
                                        valueAsNumber: true,
                                    })}
                                />
                                {errors.postcode && (
                                    <p className="text-red-500 text-sm">
                                        Post code is required
                                    </p>
                                )}
                            </div>

                            {/* Phone Number */}
                            <div>
                                <label className="block mb-1 font-medium">
                                    Phone Number *
                                </label>
                                <input
                                    type="number"
                                    className="input w-full border focus:border-none px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                    placeholder="01XXXXXXXXX"
                                    {...register("phone", {
                                        required: true,
                                        valueAsNumber: true,
                                    })}
                                />
                                {errors.phone && (
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
                                Pay with SSLCommerz
                            </button>
                        </motion.form>
                    )}
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Checkout;
