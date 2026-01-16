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
import { useNavigate } from "react-router";

const StripeForm = ({ info, dialogRef }) => {
    const axiosSecure = useAxiosSecure();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        try {
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
            const { error } = await stripe.createPaymentMethod({
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

            // step-2: create payment intent
            const res = await axiosSecure.post(
                `/payments/stripe/create-payment-intent`,
                info
            );
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
                    const res = await axiosSecure.patch(
                        "/payments/stripe/confirm-payment-intent",
                        { email: info?.userEmail, status: "Success" }
                    );
                    if (res.data.success === true) {
                        navigate("/success-payment");
                    }
                }
            }
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: "error",
                title: "Congratulations!",
                text: `${error.response.data.message}`,
                confirmButtonColor: "#FFAE00",
            });
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
