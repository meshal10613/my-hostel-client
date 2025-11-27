import React, { useEffect, useState, useRef } from "react";
import Lottie from "lottie-react";

const SuccessPayment = () => {
    const [animationData, setAnimationData] = useState(null);
    const [showButton, setShowButton] = useState(false);
    const lottieRef = useRef(null);

    useEffect(() => {
        fetch("/success.json")
            .then((res) => res.json())
            .then((data) => setAnimationData(data));
    }, []);

    const handleComplete = () => {
        const anim = lottieRef.current?.animationItem;

        if (!anim) {
            console.log("⚠️ Animation not ready");
            return;
        }

        const totalFrames = anim.totalFrames;
        const fps = anim.frameRate;

        const lastSecondStart = totalFrames - fps * 1;

        // Force-loop the last 1 second
        anim.loop = true;
        anim.playSegments([lastSecondStart, totalFrames], true);

        // Show button
        setShowButton(true);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="w-64 h-64">
                {animationData && (
                    <Lottie
                        animationData={animationData}
                        loop={false}
                        lottieRef={lottieRef}
                        onComplete={handleComplete}
                    />
                )}
            </div>

            {/* Button is always in layout but hidden */}
            <button
                onClick={() => (window.location.href = "/")}
                disabled={!showButton}
                className={`
                    btn bg-gradient-to-r from-[#FFAE00] to-[#FF8A00] text-white border-none
                    ${
                        showButton
                            ? "opacity-100"
                            : "opacity-0 pointer-events-none"
                    }
                `}
            >
                Continue
            </button>
        </div>
    );
};

export default SuccessPayment;
