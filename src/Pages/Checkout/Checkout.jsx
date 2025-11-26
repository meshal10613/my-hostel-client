import React, { useState } from "react";
import { motion } from "framer-motion";
import useAuthContext from "../../Hooks/useAuthContext";
import { Navigate } from "react-router";

const Checkout = () => {
    const [method, setMethod] = useState("Stripe");
    const { paymentInfo, setPaymentInfo } = useAuthContext();

    const fadeIn = {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    };

    const handlePayment = (m) => {
        const paymentMethod = m;
        setPaymentInfo({ paymentMethod, ...paymentInfo });
        console.log(paymentInfo);
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
                                name="payment"
                                value="SSLCommerz"
                                checked={method === "Stripe"}
                                onChange={() => setMethod("Stripe")}
                                className="radio radio-primary"
                            />
                            <span className="font-medium">Stripe</span>
                        </label>

                        <label className="flex items-center gap-3 cursor-pointer hover:bg-base-200 p-2 rounded-lg transition">
                            <input
                                type="radio"
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
                <motion.div key={method} {...fadeIn}>
                    {method === "Stripe" && (
                        <div className="space-y-2">
                            <h3 className="text-2xl font-semibold text-[#FFAE00]">
                                Stripe Payment
                            </h3>
                            <div className="text-base text-base-content/70 space-y-3">
                                <p>
                                    Stripe is a world-class, secure payment
                                    platform trusted globally. It supports major
                                    credit and debit cards, Apple Pay, Google
                                    Pay, and other digital wallets. Here’s how
                                    you can complete your payment via Stripe.{" "}
                                </p>

                                <div className="space-y-2">
                                    <h3>Step-by-Step Guide:</h3>
                                    <ol className="list-decimal list-inside">
                                        <li>
                                            Select Stripe as your payment
                                            method.
                                        </li>
                                        <li>
                                            Click the Pay with Stripe button.
                                        </li>
                                        <li>
                                            You will be redirected to Stripe’s
                                            secure checkout page.
                                        </li>
                                        <li>
                                            Enter your card or digital wallet
                                            details.
                                        </li>
                                        <li>Confirm the payment.</li>
                                        <li>
                                            Once payment is successful, you will
                                            be redirected back to our website
                                            with a confirmation.
                                        </li>
                                    </ol>
                                    <p>
                                        Stripe ensures that your transaction is
                                        encrypted and processed safely. Ideal
                                        for international users or anyone who
                                        prefers a fast and reliable online
                                        payment experience.
                                    </p>
                                </div>
                                <div className="divider"></div>
                                <p>
                                    Stripe হলো একটি বিশ্বমানের, নিরাপদ পেমেন্ট
                                    প্ল্যাটফর্ম যা বিশ্বব্যাপী বিশ্বাসযোগ্য। এটি
                                    প্রধান ক্রেডিট ও ডেবিট কার্ড, Apple Pay,
                                    Google Pay এবং অন্যান্য ডিজিটাল ওয়ালেট
                                    সমর্থন করে। Stripe-এর মাধ্যমে পেমেন্ট
                                    সম্পন্ন করার ধাপগুলো.
                                </p>

                                <div className="space-y-2">
                                    <h3>পদক্ষেপ অনুসরণ করুন:</h3>
                                    <ol className="list-decimal list-inside">
                                        <li>
                                            পেমেন্ট মেথড হিসেবে Stripe নির্বাচন
                                            করুন।
                                        </li>
                                        <li>
                                            Pay with Stripe বাটনে ক্লিক করুন।
                                        </li>
                                        <li>
                                            আপনি Stripe-এর নিরাপদ চেকআউট
                                            পৃষ্ঠায় রিডাইরেক্ট হবেন।
                                        </li>
                                        <li>
                                            আপনার কার্ড বা ডিজিটাল ওয়ালেটের
                                            তথ্য প্রদান করুন।
                                        </li>
                                        <li>পেমেন্ট নিশ্চিত করুন।</li>
                                        <li>
                                            সফল পেমেন্টের পর, আপনি আমাদের সাইটে
                                            কনফার্মেশন সহ রিডাইরেক্ট হবেন।
                                        </li>
                                    </ol>
                                    <p>
                                        Stripe নিশ্চিত করে যে আপনার লেনদেন
                                        সম্পূর্ণ এনক্রিপ্টেড এবং নিরাপদভাবে
                                        প্রক্রিয়াজাত হবে।
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {method === "SSLCommerz" && (
                        <div className="space-y-2">
                            <h3 className="text-2xl font-semibold text-[#FFAE00]">
                                SSLCommerz Payment
                            </h3>
                            <div className="text-base text-base-content/70 space-y-3">
                                <p>
                                    SSLCommerz is a trusted Bangladeshi payment
                                    gateway supporting bKash, Nagad, Rocket, and
                                    major debit/credit cards. Here’s how to make
                                    a payment using SSLCommerz.{" "}
                                </p>

                                <div className="space-y-2">
                                    <h3>Step-by-Step Guide:</h3>
                                    <ol className="list-decimal list-inside">
                                        <li>
                                            Select SSLCommerz as your payment
                                            method.
                                        </li>
                                        <li>
                                            Click the Pay with SSLCommerz
                                            button.
                                        </li>
                                        <li>
                                            You will be redirected to
                                            SSLCommerz’s secure payment portal.
                                        </li>
                                        <li>
                                            Choose your preferred payment option
                                            (e.g., bKash, Nagad, Rocket, Card).
                                        </li>
                                        <li>
                                            Follow the on-screen instructions to
                                            complete the payment.
                                        </li>
                                        <li>
                                            Once successful, you will be
                                            redirected back to our website with
                                            confirmation.
                                        </li>
                                    </ol>
                                    <p>
                                        SSLCommerz ensures safe and reliable
                                        transactions for all Bangladeshi users,
                                        making local and mobile payments simple
                                        and secure.
                                    </p>
                                </div>
                                <div className="divider"></div>
                                <p>
                                    SSLCommerz হলো একটি বিশ্বাসযোগ্য বাংলাদেশি
                                    পেমেন্ট গেটওয়ে যা bKash, Nagad, Rocket এবং
                                    প্রধান ডেবিট/ক্রেডিট কার্ড সমর্থন করে।
                                    SSLCommerz ব্যবহার করে পেমেন্ট করার ধাপগুলো।
                                </p>

                                <div className="space-y-2">
                                    <h3>পদক্ষেপ অনুসরণ করুন:</h3>
                                    <ol className="list-decimal list-inside">
                                        <li>
                                            পেমেন্ট মেথড হিসেবে SSLCommerz
                                            নির্বাচন করুন।
                                        </li>
                                        <li>
                                            Pay with SSLCommerz বাটনে ক্লিক
                                            করুন।
                                        </li>
                                        <li>
                                            আপনি SSLCommerz-এর নিরাপদ পেমেন্ট
                                            পোর্টালে রিডাইরেক্ট হবেন।
                                        </li>
                                        <li>
                                            আপনার পছন্দের পেমেন্ট অপশন নির্বাচন
                                            করুন (যেমন bKash, Nagad, Rocket,
                                            Card)।
                                        </li>
                                        <li>
                                            প্রদত্ত নির্দেশনা অনুসরণ করে পেমেন্ট
                                            সম্পন্ন করুন।
                                        </li>
                                        <li>
                                            সফল পেমেন্টের পর, আপনি আমাদের সাইটে
                                            কনফার্মেশন সহ রিডাইরেক্ট হবেন।
                                        </li>
                                    </ol>
                                    <p>
                                        SSLCommerz নিশ্চিত করে যে সমস্ত লেনদেন
                                        নিরাপদ এবং নির্ভরযোগ্য, বাংলাদেশের
                                        ব্যবহারকারীদের জন্য স্থানীয় ও মোবাইল
                                        পেমেন্ট সহজ এবং সুরক্ষিত।
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
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
                                onClick={() => handlePayment(method)}
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
