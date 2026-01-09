import React, { useState } from "react";
import { IoArrowUndo } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router";
import { PinInput } from "react-input-pin-code";
import useAxios from "../../Hooks/useAxios";

const VerifyOtp = () => {
    const [error, setError] = useState("");
    const [values, setValues] = useState(["", "", "", "", "", ""]);
    const location = useLocation();
    const axiosInstance = useAxios();
    const navigate = useNavigate();

    if(location.state?.email === undefined){
        navigate("/forget-pass");
    }

    const handleOTP = async(e) => {
        e.preventDefault();
        setError("");
        const join = values.join();
        const otp = Number(join.replaceAll(",", ""));
        if(otp === 0){
            return setError("OTP is required");
        }
        const email = location.state?.email;
        const data = { email, otp };
        try {
            const res = await axiosInstance.post(
                "/users/verify-otp",
                data
            );
            if (res.data.success === true && res.data.message === "OTP verified") {
                navigate("/reset-pass", { state: { data } });
            }
        } catch (error) {
            setError(error.response.data.message);
            console.log(error);
        }
    };
    return (
        <div className="flex flex-col items-center justify-center max-w-7xl mx-auto mt-40 gap-5">
            <Link
                to="/forget-pass"
                className="btn bg-white border border-primary text-primary transition-all hover:bg-gradient-to-r from-[#FFAE00] to-[#FF8A00] hover:border-none hover:text-white"
            >
                <IoArrowUndo />
                Back
            </Link>
            <div className="bg-white max-w-5xl mx-auto p-10 lg:p-12 rounded-3xl">
                <div className="flex flex-col items-center justify-center gap-5">
                    <div>
                        <h2 className="text-2xl font-bold text-center">
                            Verify OTP?
                        </h2>
                        <p>We send you an OTP</p>
                    </div>
                    <form
                        onSubmit={handleOTP}
                        className="space-y-3 flex flex-col items-center justify-center gap-3"
                    >
                        <div className="space-y-1">
                            <PinInput
                                name="otp"
                                type="number"
                                size="lg"
                                values={values}
                                autoFocus={true}
                                autoTab={true}
                                placeholder="0"
                                onChange={(value, index, values) =>
                                    setValues(values)
                                }
                            />
                            {error !== "" && (
                                <p className="text-red-500 text-sm mt-1">
                                    {error}
                                </p>
                            )}
                        </div>
                        <button
                            type="submit"
                            className="btn w-fit bg-gradient-to-r from-[#FFAE00] to-[#FF8A00] text-white py-3 rounded-lg"
                        >
                            Verify
                        </button>
                    </form>
                </div>
            </div>  
        </div>
    );
};

export default VerifyOtp;
