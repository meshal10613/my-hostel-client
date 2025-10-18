import React, { useState } from 'react';
import useAuthContext from '../../Hooks/useAuthContext';
import useAxios from '../../Hooks/useAxios';
import Swal from 'sweetalert2';

const AddReview = ({id}) => {
    const { user } = useAuthContext();
    const axios = useAxios();
    const [isOpen, setIsOpen] = useState(false);
    const [rating, setRating] = useState("");
    const [review, setReview] = useState("");
    const [load, setLoad] = useState(false);

    const handleSubmit = async(e) => {
        e.preventDefault();
        setLoad(true);

        const ratingValue = parseFloat(rating);

        if (isNaN(ratingValue) || ratingValue < 0 || ratingValue > 5) {
            alert("Rating must be a number between 0.00 and 5.00");
            return;
        }

        const serverData = {
            mealId: id,
            rating: ratingValue,
            review,
            ratingUserName: user?.displayName,
            ratingUserEmail: user?.email,
            ratingUserPhotoURL: user?.photoURL
        };

        const res = await axios.post("/ratings", serverData);
        if(res.status === 200 && res.statusText ==="OK" && res.data?.data !== "You've already reviewed this meal!"){
            setLoad(false);
            Swal.fire({
                icon: "success",
                title: "Congratulations!",
                text: `Rating added successfully`,
                confirmButtonColor: "#FFAE00"
            });
            // reset fields
            setRating("");
            setReview("");
            setIsOpen(false);
        }else if(res.data.data === "You've already reviewed this meal!"){
            Swal.fire({
                icon: "error",
                title: "Congratulations!",
                text: `${res?.data?.data}`,
                confirmButtonColor: "#FFAE00"
            });
            setLoad(false);
            // reset fields
            setRating("");
            setReview("");
            setIsOpen(false);
        }
    };
    return (
    <div className="flex justify-center mt-10">
        {/* Button to open modal */}
        <button
            className="btn btn-primary"
            onClick={() => setIsOpen(true)}
        >
            Add Review
        </button>

        {/* Modal */}
        {isOpen && (
            <dialog className="modal modal-open">
                <div className="modal-box">
                    <h3 className="font-bold text-lg mb-4">Add Your Review</h3>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Rating Input */}
                        <div>
                            <label className="label">
                            <span className="label-text">Rating (0.00 - 5.00)</span>
                            </label>
                            <input
                            type="number"
                            step="0.01"
                            min="0"
                            max="5"
                            pattern="^(?:[0-4](?:\.\d{1,2})?|5(?:\.00?)?)$"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                            className="input input-bordered w-full"
                            required
                            />
                        </div>

                        {/* Review Textarea */}
                        <div>
                            <label className="label">
                            <span className="label-text">Your Review</span>
                            </label>
                            <textarea
                            className="textarea textarea-bordered w-full"
                            placeholder="Write your review..."
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                            required
                            ></textarea>
                        </div>

                        <div className='flex items-center justify-between'>
                            {/* Close Button */}
                            <button
                                className="btn modal-action justify-center mt-0"
                                onClick={() => setIsOpen(false)}
                            >
                                Close
                            </button>
                            {/* Submit Button */}
                            <button type="submit" className="btn bg-gradient-to-r from-[#FFAE00] to-[#FF8A00] text-white py-3 rounded-lg w-32">
                                { 
                                    load 
                                    ? <div className="loading loading-spinner"></div> 
                                    : "Submit Review" 
                                }
                            </button>
                        </div>
                    </form>


                </div>
            </dialog>
        )}
        </div>
    );
};

export default AddReview;