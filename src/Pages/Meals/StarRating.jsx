import { useState } from "react";

function StarRating({ onRatingChange }) {
    const [rating, setRating] = useState(0);

    const handleRating = (value) => {
        setRating(value);
        if (onRatingChange) {
            onRatingChange(value); // Pass value to parent if needed
        }
    };

    return (
        <div className="flex justify-center items-center space-x-1 rating">
            {[1, 2, 3, 4, 5].map((value) => (
                <input
                    key={value}
                    type="radio"
                    name="rating"
                    className="mask mask-star-2 bg-orange-400"
                    checked={rating === value}
                    onChange={() => handleRating(value)}
                    required
                />
            ))}
        </div>
    );
}

export default StarRating;
