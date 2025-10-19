import React, { useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import quote from '../../assets/reviewQuote.png'

const Review = ({reviews}) => {
    const [current, setCurrent] = useState(0);
    const [showFullText, setShowFullText] = useState(false);
    const total = reviews?.length;

    const getIndex = (offset) => (current + offset + total) % total;

    const handlePrev = () => {
        setShowFullText(false);
        setCurrent((prev) => (prev - 1 + total) % total);
    };

    const handleNext = () => {
        setShowFullText(false);
        setCurrent((prev) => (prev + 1) % total);
    };

    return (
        <>
            {
                reviews.length === 0 ?
                <></> :
                <section className="bg-base-100 py-16 text-center">
                    <div className="max-w-7xl mx-auto px-4">
                        <h2 className="text-3xl md:text-4xl font-bold text-neutral mb-4">What our customers are saying</h2>
                        <p className="text-base-content mb-10 max-w-2xl mx-auto">
                        We deliver quality and speed you can trust — see what others say about our services.
                        </p>

                        {/* Carousel */}
                        <div className="relative flex items-center justify-center">
                            <div className="flex gap-4 justify-center items-end">
                                {reviews.length <= 5 ? (
                                    // ✅ Case 1: Small list (just render all reviews)
                                    reviews.map((review, index) => {
                                        const isActive = index === current;
                                        return (
                                            <ReviewCard
                                                key={index}
                                                review={review}
                                                position={index - current} // optional for styling
                                                isActive={isActive}
                                                onClick={() => {
                                                    if (isActive) {
                                                        setShowFullText((prev) => !prev);
                                                    } else {
                                                        setCurrent(index);
                                                        setShowFullText(false);
                                                    }
                                                }}
                                                showFullText={isActive && showFullText}
                                            />
                                        );
                                    })
                                ) : (
                                    // ✅ Case 2: Big list (use carousel with 5 visible cards)
                                    [...Array(5)].map((_, i) => {
                                        const offset = i - 2;
                                        const index = getIndex(offset);
                                        const isActive = offset === 0;
                                        return (
                                            <ReviewCard
                                                key={index}
                                                review={reviews[index]}
                                                position={offset}
                                                isActive={isActive}
                                                onClick={() => {
                                                    if (isActive) {
                                                        setShowFullText((prev) => !prev);
                                                    } else {
                                                        setCurrent(index);
                                                        setShowFullText(false);
                                                    }
                                                }}
                                                showFullText={isActive && showFullText}
                                            />
                                        );
                                    })
                                )}
                            </div>
                        </div>

                        {/* Dots + Arrows */}
                        <div className="flex justify-center items-center gap-4 mt-6">
                        <button
                            onClick={handlePrev}
                            className="btn btn-circle btn-sm bg-base-200 text-primary hover:bg-primary hover:text-white"
                        >
                            <FaArrowLeft />
                        </button>

                        <div className="flex gap-2">
                            {reviews.map((_, index) => (
                            <button
                                key={index}
                                className={`w-3 h-3 rounded-full ${current === index ? 'bg-primary' : 'bg-base-300'}`}
                                onClick={() => {
                                setCurrent(index);
                                setShowFullText(false);
                                }}
                            />
                            ))}
                        </div>

                        <button
                            onClick={handleNext}
                            className="btn btn-circle btn-sm bg-base-200 text-primary hover:bg-primary hover:text-white"
                        >
                            <FaArrowRight />
                        </button>
                        </div>
                    </div>
                </section>
            }
        </>
    );
};

// Y-position based on offset
const getTranslateY = (position) => {
    switch (position) {
        case -2:
        case 2:
        return 'translate-y-20';
        case -1:
        case 1:
        return 'translate-y-10';
        default:
        return 'translate-y-0';
    }
};

const ReviewCard = ({ review, position, isActive, onClick, showFullText }) => {
    return (
        <div
            onClick={onClick}
            className={`cursor-pointer card shadow-md p-6 rounded-2xl w-[21rem] h-80 transition-all duration-500 transform ${getTranslateY(
                position
            )} ${isActive ? 'bg-white scale-100 opacity-100 z-10' : 'bg-base-200 scale-95 opacity-50 z-0'}`}
        >
            <div className="flex justify-baseline mb-4">
                {/* <FaQuoteLeft className="text-primary text-2xl" /> */}
                <img src={quote} alt="" />
            </div>

            {/* Scrollable description */}
            <div className={`text-base-content mb-4 text-left pr-2 h-24 overflow-y-auto`}>
                <p className={`${showFullText ? '' : 'line-clamp-4'}`}>{review?.review}</p>
            </div>

            {/* ⭐ Rating stars */}
            <div className="rating">
                {[1, 2, 3, 4, 5].map((num) => (
                    <input
                        key={num}
                        type="radio"
                        name={`rating-${review?.ratingUserName}`} // unique per review
                        className="mask mask-star-2 bg-orange-400"
                        checked={num === Math.round(review?.rating)}
                        readOnly
                    />
                ))}
            </div>

            {/* Author */}
            <div className="flex items-center gap-4 mt-auto">
                <div className="avatar">
                    <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img src={review?.ratingUserPhotoURL} alt={review?.ratingUserName} />
                    </div>
                </div>
                <div className="text-left">
                    <p className="font-bold text-neutral">{review?.ratingUserName}</p>
                    {/* <p className="text-sm text-base-content">{review?.title}</p> */}
                </div>
            </div>
        </div>
    );
};

export default Review;