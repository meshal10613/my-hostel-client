import {
    CardCvcElement,
    CardExpiryElement,
    CardNumberElement,
    useElements,
    useStripe,
} from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { MdError } from "react-icons/md";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const StripeForm = ({ info, dialogRef }) => {
    const axiosSecure = useAxiosSecure();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (e) => {
        setError("");
        setLoading(true);
        e.preventDefault();
        if (!stripe || !elements) {
            setError("Stripe is not loaded yet.");
            setLoading(false);
            return;
        }
        const card = elements.getElement(CardNumberElement);

        if (!card) {
            setError("Card information is required.");
            setLoading(false);
            return;
        }

        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card,
        });

        if (error) {
            setError(error.message);
            setLoading(false);
            return;
        } else {
            setError("");
        }

        const ammountInCents = info.price;
        const serverData = {
            ...info,
            status: "Pending",
        };

        //step-2: create payment intent
        const res = await axiosSecure.post(`/stripe/create-payment-intent`, {
            ammountInCents,
            serverData,
        });
        const clientSecret = res.data.clientSecret;

        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardNumberElement),
                billing_details: {
                    name: info?.userName,
                    email: info?.userEmail,
                },
            },
        });

        if (result.error) {
            setError(result.error.message);
            setLoading(false);
            return;
        } else {
            if (result.paymentIntent.status === "succeeded") {
                setError("");
                setLoading(false);
                //? Close the modal
                dialogRef.current.close();
                serverData.status = "Success";
                const res = await axiosSecure.post(
                    "/stripe/confirm-payment-intent",
                    serverData
                );
                if (res.data.count) {
                    Swal.fire({
                        icon: "success",
                        title: "Congratulations!",
                        text: `Payment Successful!`,
                        confirmButtonColor: "#FFAE00",
                    });
                }
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <label>Card Number</label>
            <div className="w-full p-3 bg-secondary rounded-lg">
                <CardNumberElement
                    options={{
                        style: {
                            base: {
                                fontSize: "16px",
                                color: "#424770",
                                backgroundColor: "#f5f5f5",
                                "::placeholder": {
                                    color: "#aab7c4",
                                },
                                // "::selection": {
                                //     color: "#fff",
                                //     backgroundColor: "#000",
                                // },
                            },
                            invalid: {
                                color: "#FF0000",
                            },
                        },
                    }}
                />
            </div>

            <div className="grid grid-cols-6 gap-3">
                <div className="col-span-4 ">
                    <label>Expiration Date</label>
                    <div className="w-full p-3 bg-secondary rounded-lg">
                        <CardExpiryElement
                            options={{
                                style: {
                                    base: {
                                        fontSize: "16px",
                                        color: "#424770",
                                        backgroundColor: "#f5f5f5",
                                        "::placeholder": {
                                            color: "#aab7c4",
                                        },
                                        "::selection": {
                                            color: "#fff",
                                            backgroundColor: "#000",
                                        },
                                    },
                                    invalid: {
                                        color: "#FF0000",
                                    },
                                },
                            }}
                        />
                    </div>
                </div>

                <div className="col-span-2">
                    <label>CVC</label>
                    <div className="w-full p-3 bg-secondary rounded-lg">
                        <CardCvcElement
                            options={{
                                style: {
                                    base: {
                                        fontSize: "16px",
                                        color: "#424770",
                                        backgroundColor: "#f5f5f5",
                                        "::placeholder": {
                                            color: "#aab7c4",
                                        },
                                        "::selection": {
                                            color: "#fff",
                                            backgroundColor: "#000",
                                        },
                                    },
                                    invalid: {
                                        color: "#FF0000",
                                    },
                                },
                            }}
                        />
                    </div>
                </div>
            </div>

            <button
                type="submit"
                className="btn btn-block bg-gradient-to-r from-[#FFAE00] to-[#FF8A00] text-white border-none"
                disabled={loading}
            >
                {loading ? (
                    <div className="loading loading-spinner"></div>
                ) : (
                    "Pay"
                )}
            </button>
            {error && (
                <p className="text-red-500 text-center flex items-center gap-1">
                    <MdError size={20} />
                    {error}
                </p>
            )}
        </form>
    );
};

export default StripeForm;
