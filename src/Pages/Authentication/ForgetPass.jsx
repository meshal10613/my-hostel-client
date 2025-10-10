import React from 'react';
import { IoArrowUndo } from 'react-icons/io5';
import { Link } from 'react-router';

const ForgetPass = () => {
    const handleEmail = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        console.log(email)
    };
    return (
        <div className='flex flex-col items-center justify-center max-w-7xl mx-auto mt-40 gap-5'>
            <Link to="/auth" className='btn bg-white border border-primary text-primary transition-all hover:bg-gradient-to-r from-[#FFAE00] to-[#FF8A00] hover:border-none hover:text-white'>
                <IoArrowUndo />Back to Login
            </Link>
            <div className='bg-white max-w-5xl mx-auto p-10 lg:p-20 rounded-3xl'>
                <div className='flex flex-col items-center justify-center gap-5'>
                    <div>
                        <h2 className='text-2xl font-bold text-center'>Forgotten Password?</h2>
                        <p>No worries, we’ll send you reset instructions</p>
                    </div>
                    <form onSubmit={handleEmail} className='space-y-3'>
                        <div>
                            <label className="block font-medium">Email</label>
                            <input type="email" name="email" id="" placeholder='Enter your email' className='input w-80' required />
                        </div>
                        <button type='submit' className='btn w-full bg-gradient-to-r from-[#FFAE00] to-[#FF8A00] text-white py-3 rounded-lg' >Continue</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ForgetPass;