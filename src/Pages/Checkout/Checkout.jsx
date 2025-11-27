import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import useAuthContext from "../../Hooks/useAuthContext";
import StripeContent from "./StripeContent";
import SSLCommerzContent from "./SSLCommerzContent";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const Checkout = () => {
    const [method, setMethod] = useState("Stripe");
    const { user, paymentInfo } = useAuthContext();
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const fadeIn = {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    };

    const handlePayment = async(m) => {
        const paymentMethod = m;
        const info = {
            paymentMethod,
            ...paymentInfo,
            userName: user.displayName,
            userEmail: user.email,
            status: "Pending",
        };
        const res = await axiosSecure.post("/ssl/create-payment", info);
        console.log(res.data)
        if(res.status === 200 && res.data.status === "SUCCESS"){
            window.open(res.data.GatewayPageURL);
        }
    };

    if (!paymentInfo.price) return <Navigate to="/" />;

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
                            Total: <strong>৳{paymentInfo.price || 0}</strong>
                        </p>
                        <p className="flex items-center justify-between">
                            Discount:{" "}
                            <strong>৳{paymentInfo?.discount || 0}</strong>
                        </p>
                        <p className="flex items-center justify-between">
                            Tax: <strong>৳{paymentInfo?.tax || 0}</strong>
                        </p>
                        <div className="divider"></div>
                        <p className="flex items-center justify-between">
                            Grand Total:{" "}
                            <strong>৳{paymentInfo.price || 0}</strong>
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
                        <motion.div {...fadeIn} className="space-y-4">
                            <p className="text-sm text-base-content/70">
                                SSLCommerz checkout will appear here.
                            </p>
                            <button
                                onClick={() => handlePayment(method)}
                                className="btn bg-gradient-to-r from-[#FFAE00] to-[#FF8A00] text-white border-none w-full shadow-md hover:scale-[1.03] transition"
                            >
                                Pay with SSLCommerz
                            </button>
                        </motion.div>
                    )}
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Checkout;
