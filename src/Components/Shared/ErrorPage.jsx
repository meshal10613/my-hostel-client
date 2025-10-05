import React from 'react';
import { Link, useRouteError } from 'react-router';
import Error from '/error-page.png';
import { IoArrowUndo } from 'react-icons/io5';

const ErrorPage = () => {
    const error = useRouteError();
    return (
        <div className='flex flex-col items-center justify-center gap-1'>
            <img src={Error} alt="" className='w-fit' />
            <p className='mb-3 text-xl bg-gradient-to-r from-[#FFAE00] to-[#FF8A00] bg-clip-text text-transparent'>{error.data}</p>
            <Link to="/" className='btn text-white bg-gradient-to-r from-[#FFAE00] to-[#FF8A00] border-none'><IoArrowUndo />Back to Home</Link>
        </div>
    );
};

export default ErrorPage;