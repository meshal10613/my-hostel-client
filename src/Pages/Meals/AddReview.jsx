import React, { useState } from 'react';
import useAuthContext from '../../Hooks/useAuthContext';
import useAxios from '../../Hooks/useAxios';
import Swal from 'sweetalert2';
import StarRating from './StarRating';

const AddReview = ({ id, queryClient, title, category }) => {
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
            mealTitle: title,
            mealCategory: category,
            rating: ratingValue,
            review,
            reviewUserName: user?.displayName,
            reviewUserEmail: user?.email,
            reviewUserPhotoURL: user?.photoURL
        };

        const res = await axios.post("/reviews", serverData);
        if(res.data.success === true && res.data.action === "created"){
            setLoad(false);
            Swal.fire({
                icon: "success",
                title: "Congratulations!",
                text: `Rating added successfully!`,
                confirmButtonColor: "#FFAE00"
            });
            // reset fields
            setRating("");
            setReview("");
            setIsOpen(false);
            queryClient.invalidateQueries(["meal"]);
        }else if(res.data.success === true && res.data.action === "updated"){
            Swal.fire({
                icon: "success",
                title: "Congratulations!",
                text: `Rating updated successfully`,
                confirmButtonColor: "#FFAE00"
            });
            setLoad(false);
            // reset fields
            setRating("");
            setReview("");
            setIsOpen(false);
            queryClient.invalidateQueries(["meal"]);
        }else{
            Swal.fire({
                icon: "error",
                title: "Sorry!",
                text: `${res.data.message}`,
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
    <div className="flex justify-center flex-1">
        {/* Button to open modal */}
        <button
            className="btn btn-block text-primary bg-white border border-primary"
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
                        <StarRating onRatingChange={setRating} />

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
                                    : "Submit" 
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