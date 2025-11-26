import React from "react";

const StripeContent = () => {
    return (
        <div className="space-y-2">
            <h3 className="text-2xl font-semibold text-[#FFAE00]">
                Stripe Payment
            </h3>
            <div className="text-base text-base-content/70 space-y-3">
                <p>
                    Stripe is a world-class, secure payment platform trusted
                    globally. It supports major credit and debit cards, Apple
                    Pay, Google Pay, and other digital wallets. Here’s how you
                    can complete your payment via Stripe.{" "}
                </p>

                <div className="space-y-2">
                    <h3>Step-by-Step Guide:</h3>
                    <ol className="list-decimal list-inside">
                        <li>Select Stripe as your payment method.</li>
                        <li>Click the Pay with Stripe button.</li>
                        <li>
                            You will be redirected to Stripe’s secure checkout
                            page.
                        </li>
                        <li>Enter your card or digital wallet details.</li>
                        <li>Confirm the payment.</li>
                        <li>
                            Once payment is successful, you will be redirected
                            back to our website with a confirmation.
                        </li>
                    </ol>
                    <p>
                        Stripe ensures that your transaction is encrypted and
                        processed safely. Ideal for international users or
                        anyone who prefers a fast and reliable online payment
                        experience.
                    </p>
                </div>
                <div className="divider"></div>
                <p>
                    Stripe হলো একটি বিশ্বমানের, নিরাপদ পেমেন্ট প্ল্যাটফর্ম যা
                    বিশ্বব্যাপী বিশ্বাসযোগ্য। এটি প্রধান ক্রেডিট ও ডেবিট কার্ড,
                    Apple Pay, Google Pay এবং অন্যান্য ডিজিটাল ওয়ালেট সমর্থন
                    করে। Stripe-এর মাধ্যমে পেমেন্ট সম্পন্ন করার ধাপগুলো.
                </p>

                <div className="space-y-2">
                    <h3>পদক্ষেপ অনুসরণ করুন:</h3>
                    <ol className="list-decimal list-inside">
                        <li>পেমেন্ট মেথড হিসেবে Stripe নির্বাচন করুন।</li>
                        <li>Pay with Stripe বাটনে ক্লিক করুন।</li>
                        <li>
                            আপনি Stripe-এর নিরাপদ চেকআউট পৃষ্ঠায় রিডাইরেক্ট
                            হবেন।
                        </li>
                        <li>
                            আপনার কার্ড বা ডিজিটাল ওয়ালেটের তথ্য প্রদান করুন।
                        </li>
                        <li>পেমেন্ট নিশ্চিত করুন।</li>
                        <li>
                            সফল পেমেন্টের পর, আপনি আমাদের সাইটে কনফার্মেশন সহ
                            রিডাইরেক্ট হবেন।
                        </li>
                    </ol>
                    <p>
                        Stripe নিশ্চিত করে যে আপনার লেনদেন সম্পূর্ণ এনক্রিপ্টেড
                        এবং নিরাপদভাবে প্রক্রিয়াজাত হবে।
                    </p>
                </div>
            </div>
        </div>
    );
};

export default StripeContent;
