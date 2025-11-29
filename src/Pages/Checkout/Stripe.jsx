import {
    Elements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { forwardRef, useImperativeHandle, useRef } from "react";
import StripeForm from "./StripeForm";

//? Stripe Publishable Key
const stripePromise = loadStripe(import.meta.env.VITE_stripe_payment_publishable_key);

const Stripe = forwardRef((props, ref) => {
    const dialogRef = useRef(null);

    // Expose a show function to parent
    useImperativeHandle(ref, () => ({
        show: () => {
            dialogRef.current.showModal();
        },
    }));

    return (
        <dialog ref={dialogRef} className="modal">
            <div className="modal-box">
                <Elements className="space-y-4" stripe={stripePromise}>
					<StripeForm info={props.paymentTrigger} dialogRef={dialogRef}/>
                </Elements>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>Close</button>
            </form>
        </dialog>
    );
});

export default Stripe;
